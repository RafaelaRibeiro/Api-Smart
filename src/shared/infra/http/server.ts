import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { router } from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger.json";

import cors from "cors";

import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(bodyParser.json());
app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);

app.listen(3333, () => console.log("Server started on 3333"));
