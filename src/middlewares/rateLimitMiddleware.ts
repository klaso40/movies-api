import rateLimit from 'express-rate-limit'
import 'dotenv/config'

const windowSeconds: number = Number(process.env.RATE_LIMIT_WINDOW_MINUTES) || 15
const maxRequestsPerWindow: number = Number(process.env.RATE_LIMIT_MAX_REQUESTS_PER_WINDOW) || 100

const rateLimitMiddleware = () => {
    return rateLimit({
        windowMs: windowSeconds * 60 * 1000, // 15 minutes
        max: maxRequestsPerWindow, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    })
}

export default rateLimitMiddleware
