/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./middlewares/GlobarlErrorHandler";
import NotFound from "./middlewares/NotFound";
import router from "./routes";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
//
app.use(
  cors({
    origin: "https://mini-event-scheduler-client.vercel.app",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  })
);
// application routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome Back! Event Scheduler!!!");
});

app.use(globalErrorHandler);

//Not Found
app.use(NotFound);

export default app;
