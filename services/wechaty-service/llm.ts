import OpenAI from 'openai'

import { OPENAI_API_KEY } from "./config.js"

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
})

// Function to generate the prompt
function generatePrompt(text: string): string {
    return `
      do sentiment analysis on the following text: "{text}" and output the sentiment score:
      - If sentiment is positive output 1
      - if negative output -1
      - if neutral output 0
      Output sentiment: {score} and if it contains politics, sex or insult, output flagged: 1, else output flagged: 0 in json format.
    `.replace("{text}", text);
}

export async function analyze(text: string): Promise<null | { sentiment: -1 | 0 | 1, flagged: 0 | 1 }> {
    try {
        const prompt = generatePrompt(text);
        const response = await openai.chat.completions.create({
          messages: [{ role: 'user', content: prompt }],
          model: "gpt-3.5-turbo-1106",
          temperature: 0
        })
        // console.log(response.choices[0]?.message.content?.trim());
        return JSON.parse(response.choices[0]?.message.content?.trim() || 'null')
    } catch (error) {
        console.error("Error in running the chain: ", error);
        return null;
    }
}
