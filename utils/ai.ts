import { OpenAI } from "@langchain/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import z from 'zod';
import { PromptTemplate } from "@langchain/core/prompts";

const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        name: z.string().describe(`
            The name of the cubic bezier function, in a professional way and removing any
            obvious names, all in lower case
        `),
        title: z.string().describe(`The name of the cubic bezier function, that will be displayed as the title`),
        description: z.string().describe('A very detailed description of the name (Each word used) of the cubic bezier function'),
        examples: z.string().describe(`Describe in which UI elements this bezier function will be great to use
            analyzing the bezier function and the needs of the user (Example if it's fast it can
            be for a modal), come up with 3 examples`),
        suggestions: z.array(z.object({
            bezierFunction: z.string().describe('The cubic bezier function in this format: cubic-bezier(...)'),
            name: z.string().describe(`
                The name of the cubic bezier function, in a professional way and removing any
                obvious names, all in lower case, don't repeat names between functions if they are different and use hyphens instead of whitespace
            `),
            description: z.string().describe('The description of the name of the cubic bezier function'),
            title: z.string().describe(`The name of the cubic bezier function, that will be displayed as the title`),
            why: z.string().describe('Why this can be a possible alternative to the first one')
        })).length(3).describe('An array of possible suggestions tweaking some properties to make similar bezier functions, but not suggesting the same as the entry one')
    })
)

const getPrompt = async (bezierFunction: string) => {
    const format_instructions = parser.getFormatInstructions();
    
    const prompt = new PromptTemplate({
        template: `You are a professional design engineer (Animations in the web),
            I'll give you a cubic bezier function and I want you to come up
            with valuable information based on the schema I'll provide to you.
            For the name I want you to use mathematical technical names, some words that can be used:
            1. Quad
            2. Cubic
            3. Quart
            4. Quint
            5. Expo
            6. Circ
            7. Ease
            Don't limit yourself to only these words, expand it to more, please try to make each 
            cubic bezier function unique and not make the name very generic, and exclude words that
            can make it very obvious for example: function, cubic bezier, etc.
            Follow the instructions and format your response to match the format instructions.\n{format_instructions}\n{entry}`,
        inputVariables: ['entry'],
        partialVariables: { format_instructions }
    });

    const input = await prompt.format({
        entry: bezierFunction
    })

    return input;
}

export const analyze = async (prompt: string) => {
    const input = await getPrompt(prompt);
    const model = new OpenAI({temperature: 0, modelName: 'gpt-3.5-turbo'});
    const result = await model.invoke(input);
    
    try{
        return parser.parse(result)
    } catch (e){
        console.log(e)
    }
}