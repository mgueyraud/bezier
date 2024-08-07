'use server';

import { analyze } from "@/utils/ai";

export async function analyzeCubicBezier(prevState: any, formData: FormData){
    const x1 = formData.get('x1') + '';
    const y1 = formData.get('y1') + '';
    const x2 = formData.get('x2') + '';
    const y2 = formData.get('y2') + '';

    const response = await analyze(`cubic-bezier(${x1},${y1},${x2}, ${y2})`);

    return {...response, points: {x1, y1, x2, y2}};
}