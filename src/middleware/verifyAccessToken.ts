import { JsonWebTokenError } from "jsonwebtoken";
import { Middleware } from "./types";
import { verifyAccessToken } from "@app/auth/index";
import { UserPayload } from "@app/auth/types";

const verifyAccessTokenMiddleware: Middleware = (req, res, next) => {
  const bearerToken = req.headers["authorization"];
  if (bearerToken !== undefined) {
    const [type, encodedToken] = bearerToken.split(" ");
    if (type !== "Bearer") {
      res.status(401).json({
        error: "Invalid access token",
      });
    } else {
      const token = Buffer.from(encodedToken, "base64").toString();
      try {
        const payload = verifyAccessToken(token);
        req.user = payload.user as UserPayload;
        next();
      } catch (error) {
        if (error instanceof JsonWebTokenError) {
          res.status(401).json({
            error: "Could not verify access token",
          });
        }
      }
    }
  } else {
    res.status(401).json({
      error: "Access token not found",
    });
  }
};

export default verifyAccessTokenMiddleware;
