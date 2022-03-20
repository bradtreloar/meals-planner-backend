import faker from "@faker-js/faker";
import { renderPasswordResetMessage } from ".";

describe("renderPasswordResetMessage", () => {
  it("renders password reset message template", () => {
    const passwordResetURL = faker.internet.url();
    const message = renderPasswordResetMessage({
      passwordResetURL,
    });

    expect(message).toMatch(/reset password/i);
    expect(message).toMatch(/set new password/i);
    expect(message).toMatch(passwordResetURL);
  });
});
