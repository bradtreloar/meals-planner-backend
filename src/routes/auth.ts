import { login } from "@app/controllers/auth";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/login", login);

export default authRouter;
