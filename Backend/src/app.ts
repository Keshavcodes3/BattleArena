import express from 'express'

const app=express()



app.get('/', () => {
    return 'hello buddy'
})

export default app