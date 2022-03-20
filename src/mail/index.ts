import { values } from "lodash";
import { compileFile } from "pug";

export class EnvironmentVariableNotSetException extends Error {
  constructor(variableName: string) {
    super(`${variableName} not set in environment`);
  }
}

const compileTemplate = (name: string) =>
  compileFile(`${__dirname}/templates/${name}.pug`);

export const renderPasswordResetMessage = compileTemplate("passwordReset");

export const getSMTPSettings = () => {
  const variableMappings = {
    fromAddress: "SMTP_FROM_ADDRESS",
    fromName: "SMTP_FROM_NAME",
    host: "SMTP_HOST",
    port: "SMTP_PORT",
    username: "SMTP_USERNAME",
    password: "SMTP_PASSWORD",
  };

  values(variableMappings).forEach((variableName) => {
    if (process.env[variableName] === undefined) {
      throw new EnvironmentVariableNotSetException(variableName);
    }
  });

  const settings = {
    fromAddress: process.env[variableMappings.fromAddress] as string,
    fromName: process.env[variableMappings.fromName] as string,
    host: process.env[variableMappings.host] as string,
    port: process.env[variableMappings.port] as string,
    username: process.env[variableMappings.username] as string,
    password: process.env[variableMappings.password] as string,
  };

  return settings;
};
