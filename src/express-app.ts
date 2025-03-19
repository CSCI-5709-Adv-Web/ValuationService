import express from "express"
import cors from "cors"
import routes from "./routes"
import { httpLogger, HandleErrorWithLogger, RequestTimingMiddleware } from "./utils"
import { ResponseMiddleware } from "./middlewares/response.middleware"
import { RequestResponseLogger } from "./middlewares/logger.middleware"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import { config } from "./config"

export const ExpressApp = async () => {
  const app = express()
  app.use(helmet())
  if (config.app.env === "production") {
    app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
      }),
    )
  }
  app.use(cors())
  app.use(express.json())
  app.use(RequestTimingMiddleware)
  app.use(httpLogger)
  if (config.app.env !== "production") {
    app.use(RequestResponseLogger)
  }
  app.use(ResponseMiddleware)
  app.get("/health", (_, res) => {
    res.success({ status: "ok" })
  })
  app.use("/api", routes)
  app.use(HandleErrorWithLogger)
  return app
}