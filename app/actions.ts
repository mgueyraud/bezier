'use server';

import cubicBezierSchema from "@/schemas/cubicBezier";
import { AnalyzeCubicBezierResult, AnalyzeCubicBezierSuccessResult } from "@/types/BezierAnalysis";
import { analyze } from "@/utils/ai";

export async function analyzeCubicBezier(prevState: any, formData: FormData): Promise<AnalyzeCubicBezierResult> {
    try{
        const x1 = Number(formData.get('x1'));
        const y1 = Number(formData.get('y1'));
        const x2 = Number(formData.get('x2'));
        const y2 = Number(formData.get('y2'));
        
        const points = cubicBezierSchema.safeParse({
            x1,
            y1,
            x2,
            y2
        });
        
        
        if(!points.success){
            return {
                success: false,
                message: "Remember to use a type number, between 0 a 1"
            }
        }
        
        const response = await analyze(`cubic-bezier(${x1},${y1},${x2}, ${y2})`);
        
        return {analysis: {...response, points: {x1, y1, x2, y2}}, success: true} as AnalyzeCubicBezierSuccessResult;

    }catch(e){
        return {
            success: false,
            message: 'Unexpected error'
        } 
    }
}