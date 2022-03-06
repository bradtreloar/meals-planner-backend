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
  return (await User.scope("public").findByPk(user.id)) as User;
};

export const generateAccessToken = (user: User) => {
  return jwt.sign(
    {
      user: {
        id: user.id,
        email: user.email,
      },
    },
    getSecret(),
    { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
  );
};

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, getSecret()) as JwtPayload;

export const hashPassword = (password: string) =>
  bcrypt.hash(password, PASSWORD_SALT_ROUNDS);

export const getSecret = () => {
  const secret = process.env.SECRET;
  if (secret === undefined) {
    throw new Error("SECRET not set in environment");
  }
  return secret;
};
