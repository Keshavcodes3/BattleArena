import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai"
import {ChatCohere} from "@langchain/cohere"
import apiConfig from "../config/config.js"


const geminiModel = new ChatGoogle({
  apiKey: apiConfig.GEMINIT_API_KEY,
  model: "gemini-2.5-flash",
})

const mistralModel = new ChatMistralAI({
  apiKey: apiConfig.MISTRAL_API_KEY,
  model: "mistral-medium",
})


const cohereModel = new ChatCohere({
  apiKey: apiConfig.COHERE_API_KEY,
  model: "command-a-03-2025",
})

type AIMODELS = {
  cohereModel:ChatCohere,
  geminiModel:ChatGoogle,
  mistralModel:ChatMistralAI
}


const aiModels:AIMODELS = {
  cohereModel,
  geminiModel,
  mistralModel
}


export default aiModels