import { AxiosError } from 'axios'
import { NextFunction, Request, Response } from 'express'
import logger from '../utils/logger'

const errorMiddleware = () => {
    return (err: any | AxiosError, req: Request, res: Response, next: NextFunction) => {
        logger.error({
            error: err
        })
        if(err.isAxiosError) return res.status(err.response?.status).json(err.response?.data)
        return res.status(500).json({ errors: ['Internal server error'] })
    }
}

export default errorMiddleware
