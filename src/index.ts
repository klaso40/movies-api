import 'reflect-metadata'
import express from 'express'
import moviesRouter from './routes/movies'
import 'dotenv/config'
import loggingMiddleware from './middlewares/loggingMiddleware'
import errorMiddleware from './middlewares/errorMiddleware'
import rateLimitMiddleware from './middlewares/rateLimitMiddleware'

const app = express()
const PORT = process.env.PORT || 8080

app.use(loggingMiddleware())

app.use(rateLimitMiddleware())

app.use('/movies', moviesRouter)

app.use(errorMiddleware())

app.listen(PORT, () => {
    console.log(`App started on http://localhost:${PORT} 🚀`)
})


