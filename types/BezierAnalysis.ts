
export type AnalyzeCubicBezierSuccessResult = {
  success: true;
  analysis: {
    name: string;
    title: string;
    description: string;
    examples: string;
    suggestions: Array<{
      bezierFunction: string;
      name: string;
      description: string;
      title: string;
      why: string;
    }>;
    htmlCssCode: string;
    codeExamples: {
      css: string,
    },
    points: {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
    };
  };
};

export type AnalyzeCubicBezierErrorResult = {
  success: false;
  message: string;
};

export type AnalyzeCubicBezierResult = AnalyzeCubicBezierSuccessResult | AnalyzeCubicBezierErrorResult;
