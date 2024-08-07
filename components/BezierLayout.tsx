"use client";
import { analyzeCubicBezier } from "@/app/actions";
import { useFormState } from "react-dom";
import Form from "./Form";
import BezierAnalysis from "./BezierAnalysis";

export default function BezierLayout() {
  const [state, action] = useFormState(analyzeCubicBezier, null);

  return (
    <>
      <Form action={action} />
      {state ? <BezierAnalysis analysis={state} /> : null}
    </>
  );
}
