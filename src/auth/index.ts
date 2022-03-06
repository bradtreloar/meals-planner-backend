import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "@app/models/User";

export const PASSWORD_SALT_ROUNDS = 10;
export const ACCESS_TOKEN_EXPIRES_IN = "1800s";

export class UserNotFoundException extends Error {
  constructor() {
    super("User not found");
  }
}

export class InvalidPasswordException extends Error {
  constructor() {
    super("Invalid password");
  }
}

export const authenticatePassword = async (email: string, password: string) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user === null) {
    throw new UserNotFoundException();
  }
  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    throw new InvalidPasswordException();
  }
  return user;
};

export const generateAccessToken = (user: User, secret: string) => {
  return jwt.sign(
    {
      user: {
        id: user.id,
        email: user.email,
      },
    },
    secret,
    { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
  );
};

export const verifyAccessToken = (token: string, secret: string) =>
  jwt.verify(token, secret) as JwtPayload;
