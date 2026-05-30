import { config } from 'dotenv'
config()

/**
 * GOOGLE_API_KEY=string
 * MISTRAL_API_KEY=string
 * COHERE_API_KEY=string
 */


type CONFIG={
    readonly COHERE_API_KEY:string,
    readonly MISTRAL_API_KEY:string,
    readonly GOOGLE_API_KEY:string
}

const apiConfig:CONFIG={
    MISTRAL_API_KEY:process.env.MISTRAL_API_KEY||"",
    GOOGLE_API_KEY:process.env.GOOGLE_API_KEY||"",
    COHERE_API_KEY:process.env.COHERE_API_KEY||""
}



export default apiConfig

