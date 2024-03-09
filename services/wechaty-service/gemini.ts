import { GoogleGenerativeAI } from '@google/generative-ai'
import { FileBox } from 'file-box'

import { GEMINI_API_KEY } from "./config.js"

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

// Converts local file information to a GoogleGenerativeAI.Part object.
async function fileToGenerativePart(path: string) {
  const fileBox = FileBox.fromFile(path)
  const mediaType = fileBox.mediaType
  return {
    inlineData: {
      data: await fileBox.toBase64(),
      mimeType: mediaType,
    },
  }
}

/**
 * See: https://ai.google.dev/tutorials/node_quickstart#generate-text-from-text-and-image-input
 */
export async function proGeminiV1(
  prompt: string,
  imagePaths: string[],
) {
  // For text-and-image input (multimodal), use the gemini-pro-vision model
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" })

  const imageParts = await Promise.all(
    imagePaths.map(path => fileToGenerativePart(path))
  )

  const result = await model.generateContent([prompt, ...imageParts])
  const response = await result.response
  const text = response.text()
  return text
}
