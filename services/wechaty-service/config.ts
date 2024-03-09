import 'dotenv/config'

const MONGO_URI=process.env['MONGO_URI'] || ''
if (!MONGO_URI) {
    throw new Error('MONGO_URI is not set')
}

const OPENAI_API_KEY=process.env['OPENAI_API_KEY'] || ''
if (!OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set')

}

const GEMINI_API_KEY=process.env['GEMINI_API_KEY'] || ''
if (!GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not set')

}

export {
  MONGO_URI,
  OPENAI_API_KEY,
  GEMINI_API_KEY,
}
