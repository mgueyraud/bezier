import BezierLayout from "@/components/BezierLayout";

export default function Home() {
  return (
    <main>
      <h1 className="text-center mt-10 text-4xl font-semibold font-sans">
        Cubic Bezier
      </h1>
      <p className="max-w-lg mx-auto mt-4 text-base font-mono text-center">
        Generate creative names for cubic bezier functions, visualize them, and
        copy for use.
      </p>
      <BezierLayout />
    </main>
  );
}
