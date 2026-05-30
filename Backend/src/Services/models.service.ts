import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import apiConfig from "../config/config.js";
import { ChatMistralAI } from "@langchain/mistralai";

import {ChatCohere} from '@langchain/cohere'

const geminiModel=new ChatGoogleGenerativeAI({
    model:"gemini-flash-latest",
    apiKey:apiConfig.GOOGLE_API_KEY
})

const mistralModel=new ChatMistralAI({
    model:"mistral-small",
    apiKey:apiConfig.MISTRAL_API_KEY
})


const cohereModel=new ChatCohere({
    apiKey:apiConfig.COHERE_API_KEY,
    model:"command-xlarge-20221108"
})

const aiModels={
    geminiModel,
    mistralModel,
    cohereModel

}

export default aiModels
