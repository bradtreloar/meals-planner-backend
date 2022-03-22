import { login, refresh, resetPassword } from "@app/controllers/auth";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/refresh", refresh);
authRouter.post("/reset-password", resetPassword);

export default authRouter;
