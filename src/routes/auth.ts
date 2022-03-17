import { login, refresh } from "@app/controllers/auth";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/refresh", refresh);

export default authRouter;
