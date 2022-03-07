import { Router } from "express";
import authRouter from "./auth";

const indexRouter = Router();

indexRouter.get("/", (_, res) => {
  res.send("Hello World!");
});
indexRouter.use("/auth", authRouter);

export default indexRouter;
