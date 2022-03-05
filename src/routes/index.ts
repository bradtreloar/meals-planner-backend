import { Router } from "express";

const indexRouter = Router();

indexRouter.get("/", (_, res) => {
  res.send("Hello World!");
});

export default indexRouter;
