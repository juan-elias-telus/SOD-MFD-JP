import { checkInput, validator } from '../validatorHelpers'

describe("validatorHelpers", () => {
  it("should allow alphanumerics", async () => {
    const result = await checkInput(null, "abc123");
    const validate = await validator(() => Promise.resolve(true));

    expect(result).toBe(true);
    expect(validate).toBe(true)
  })

  it("should throw error if not alphanumerics only", async () => {
    jest.mock(
      '../validatorHelpers',
      () => ({
        throwRejected: (message: string): Promise<never> => {
          return Promise.reject(new Error(message));
        },
        checkInput: jest.fn()
      }),
      { virtual: true }
    );

    try {
      await checkInput(null, "abc123!");
    } catch (error) {
      expect(error).toStrictEqual(new Error("Description must only include alphanumeric characters!"));
    }
  })

  it("should throw error if input has spaces only", async () => {
    jest.mock(
      '../validatorHelpers',
      () => ({
        throwRejected: (message: string): Promise<never> => {
          return Promise.reject(new Error(message));
        },
        checkInput: jest.fn()
      }),
      { virtual: true }
    );

    try {
      await checkInput(null, "   ");
    } catch (error) {
      expect(error).toStrictEqual(new Error("Description cannot be empty or blank!"));
    }
  })

  it("should throw error if input is empty", async () => {
    jest.mock(
      '../validatorHelpers',
      () => ({
        throwRejected: (message: string): Promise<never> => {
          return Promise.reject(new Error(message));
        },
        checkInput: jest.fn()
      }),
      { virtual: true }
    );

    try {
      await checkInput(null);
    } catch (error) {
      expect(error).toStrictEqual(new Error("Description cannot be empty or blank!"));
    }
  })
})