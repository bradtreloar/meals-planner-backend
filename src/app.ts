import express from "express";
import indexRouter from "./routes";

const createApp = () => {
  const app = express();

  // Middleware.
  app.use(express.json());
  app.use(indexRouter);

  return app;
};

export default createApp;
