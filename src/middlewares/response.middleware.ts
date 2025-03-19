import type { Request, Response, NextFunction } from "express"
import type { ApiResponse } from "../types/api.type"
import { performance } from "perf_hooks"

// Extend Express Response to add success method
declare global {
  namespace Express {
    interface Response {
      success: <T>(data: T, status?: number) => void
    }
  }
}

export const ResponseMiddleware = (_req: Request, res: Response, next: NextFunction): void => {
  // Add success method to response object
  res.success = function <T>(data: T, status = 200): void {
    const req = this.req

    // Calculate request duration if startTime exists
    const duration = req.startTime ? Math.round(performance.now() - req.startTime) : undefined

    const response: ApiResponse<T> = {
      success: true,
      data,
      meta: {
        requestId: req.id as string,
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
        duration,
      },
    }

    this.status(status).json(response)
  }

  next()
}

