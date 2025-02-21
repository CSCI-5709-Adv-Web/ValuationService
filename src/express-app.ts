import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import valuationRoute from "./routes/valuation.route";
import { httpLogger, HandleErrorWithLogger } from "./utils";

export const ExpressApp = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(httpLogger);

  app.use(valuationRoute);

  app.use(HandleErrorWithLogger);

  return app;
};