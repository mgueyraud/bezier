import InfoIcon from "@/icons/InfoIcon";
import type { BezierAnalysis } from "@/types/BezierAnalysis";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function BezierAnalysis({
  analysis,
}: {
  analysis: BezierAnalysis;
}) {
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
      <h3 className="mt-6 text-lg font-medium">Suggestions</h3>
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
