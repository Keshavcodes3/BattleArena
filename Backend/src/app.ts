import express from 'express'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({
    message: "helloooo"
  })
})

import useGraph from "./Services/graph.ai.service.js"
app.post('/use-graph', async (req, res) => {
  await useGraph("who is ELon musk")
})

export default app