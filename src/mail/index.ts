import { compileFile } from "pug";

const compileTemplate = (name: string) =>
  compileFile(`${__dirname}/templates/${name}.pug`);

export const renderPasswordResetMessage = compileTemplate("passwordReset");
