import InfoIcon from "@/icons/InfoIcon";
import type { AnalyzeCubicBezierSuccessResult } from "@/types/BezierAnalysis";
import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { codeToHtml } from "shiki";

export default function BezierAnalysis({
  analysis,
}: {
  analysis: AnalyzeCubicBezierSuccessResult["analysis"];
}) {
  const [cssCode, setCssCode] = useState("");

  useEffect(() => {
    codeToHtml(analysis.codeExamples.css, {
      lang: "css",
      theme: "catppuccin-mocha",
    }).then((code) => {
      setCssCode(code);
    });
  }, [analysis.codeExamples.css]);

  return (
    <div className="max-w-3xl mx-auto mt-10 mb-8">
      <h2 className="font-sans text-2xl font-bold">{analysis.title}</h2>
      <p className="font-mono text-xs mt-1">{analysis.name}</p>
      <p className="mt-3">{analysis.description}</p>
      <a
        href={`https://cubic-bezier.com/#${analysis.points.x1},${analysis.points.y1},${analysis.points.x2},${analysis.points.y2}`}
        className="text-sm underline mt-1"
        target="_blank"
      >
        View on cubic-bezier.com
      </a>
      <h3 className="mt-6 text-lg font-medium">Use</h3>
      <p className="mt-2">{analysis.examples}</p>
      <h3 className="mt-6 text-lg font-medium">Code example</h3>
      <div
        dangerouslySetInnerHTML={{ __html: cssCode }}
        className="mt-3 rounded-md"
      />
      <h3 className="mt-6 text-lg font-medium">Alternatives</h3>
      <div className="grid grid-cols-1 gap-3 mt-5 md:grid-cols-3">
        {analysis.suggestions?.map((bezierFunc) => (
          <div key={bezierFunc.bezierFunction}>
            <div className="font-medium flex gap-1 items-center">
              {bezierFunc.title}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="size-4 text-neutral-700" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-48">
                    <p className="text-xs">{bezierFunc.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="font-mono text-xs">{bezierFunc.name}</p>
            <p className="text-sm mt-4">{bezierFunc.why}</p>
            <p className="text-sm mt-4 font-mono">
              {bezierFunc.bezierFunction}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
