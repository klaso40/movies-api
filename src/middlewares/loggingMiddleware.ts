import logger from '../utils/logger'
import { NextFunction, Request, Response } from 'express'

const loggingMiddleware = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        logger.info({
            path: req.path,
            query: req.query
        })
        next()
    }
}

export default loggingMiddleware
