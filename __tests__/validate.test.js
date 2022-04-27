import validateUrl from "../src/helpers/validate.js";

describe('validate url', () => {
  it("resolved result:", () =>
    expect(
      validateUrl("https://google.com").then((result) => result))
      .resolves.toMatch("https://google.com")
  );

  it("rejected result:", () =>
    expect(validateUrl("d").catch((error) => error.message))
      .resolves.toMatch("this must be a valid URL")
  );
})
