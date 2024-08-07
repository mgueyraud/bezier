"use client";

import { useState, ClipboardEvent } from "react";
import { SubmitButton } from "./SubmitButton";

export default function Form({
  action,
}: {
  action: (payload: FormData) => void;
}) {
  const [points, setPoints] = useState({
    x1: "",
    y1: "",
    x2: "",
    y2: "",
  });

  const handleFormattingPasting = (e: ClipboardEvent<HTMLInputElement>) => {
    const clipboardText = e.clipboardData.getData("text");
    if (clipboardText.includes("cubic-bezier")) {
      e.preventDefault();

      const pointsClipboard = clipboardText
        .split("cubic-bezier(")[1]
        .split(")")[0]
        .split(",")
        .map((point) => point.trim());

      setPoints({
        x1: pointsClipboard[0],
        y1: pointsClipboard[1],
        x2: pointsClipboard[2],
        y2: pointsClipboard[3],
      });
    }
  };
  return (
    <form className="flex flex-col items-center mt-10" action={action}>
      <div className="flex font-sans text-2xl">
        <span>cubic-bezier(</span>
        <input
          name="x1"
          type="text"
          required
          value={points.x1}
          onChange={(e) => setPoints((p) => ({ ...p, x1: e.target.value }))}
          onPaste={handleFormattingPasting}
          className="border rounded border-neutral-400 p-1 mx-2 w-[4ch] text-base"
        />
        <span>,</span>
        <input
          name="y1"
          type="text"
          required
          value={points.y1}
          onChange={(e) => setPoints((p) => ({ ...p, y1: e.target.value }))}
          onPaste={handleFormattingPasting}
          className="border rounded border-neutral-400 p-1 mx-2 w-[4ch] text-base"
        />
        <span>,</span>
        <input
          name="x2"
          type="text"
          required
          value={points.x2}
          onChange={(e) => setPoints((p) => ({ ...p, x2: e.target.value }))}
          onPaste={handleFormattingPasting}
          className="border rounded border-neutral-400 p-1 mx-2 w-[4ch] text-base"
        />
        <span>,</span>
        <input
          name="y2"
          type="text"
          required
          value={points.y2}
          onChange={(e) => setPoints((p) => ({ ...p, y2: e.target.value }))}
          onPaste={handleFormattingPasting}
          className="border rounded border-neutral-400 p-1 mx-2 w-[4ch] text-base"
        />
        <span>)</span>
      </div>
      <SubmitButton
        pendingText="Generating..."
        className="rounded-md px-3 py-2 bg-zinc-800 text-white mt-10 text-sm font-sans disabled:opacity-30"
      >
        Generate
      </SubmitButton>
    </form>
  );
}
