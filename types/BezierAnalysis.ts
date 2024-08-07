export type BezierAnalysis = {
    name?: string;
    title?: string;
    description?: string;
    examples?: string;
    suggestions?: Array<{
      bezierFunction: string;
      name: string;
      description: string;
      title: string;
      why: string;
    }>;
    points: {
        x1: string,
        y1: string,
        x2: string,
        y2: string
    }
  };