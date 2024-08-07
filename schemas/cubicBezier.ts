import z from 'zod';

const cubicBezierSchema = z.object({
    x1: z.number().refine(val => val >= 0 && val <= 1),
    y1: z.number().refine(val => val >= 0 && val <= 1),
    x2: z.number().refine(val => val >= 0 && val <= 1),
    y2: z.number().refine(val => val >= 0 && val <= 1)
})

export default cubicBezierSchema;