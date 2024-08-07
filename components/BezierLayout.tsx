"use client";
import { analyzeCubicBezier } from "@/app/actions";
import { useFormState } from "react-dom";
import Form from "./Form";
import BezierAnalysis from "./BezierAnalysis";

export default function BezierLayout() {
  const [state, action] = useFormState(analyzeCubicBezier, null);
  console.log(state);

  return (
    <>
      <Form action={action} />
      {state && !state.success ? (
        <p className="text-red-600 mt-4 text-center" role="alert">
          {state.message}
        </p>
      ) : null}
      {state && state.success ? (
        <BezierAnalysis analysis={state.analysis} />
      ) : null}
    </>
  );
}
