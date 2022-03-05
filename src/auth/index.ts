import User from "@app/models/User";
import bcrypt from "bcrypt";

export const SALT_ROUNDS = 10;

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

export const authenticateUser = async (email: string, password: string) => {
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
