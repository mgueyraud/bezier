"use client";

import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  pendingText,
  ...rest
}: { children: string; pendingText: string } & ComponentProps<"button">) {
  const { pending } = useFormStatus();

  return (
    <button {...rest} disabled={pending}>
      {pending ? pendingText : children}
    </button>
  );
}
