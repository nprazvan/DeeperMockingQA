import { it, expect, describe } from "vitest";
import { HttpError, ValidationError } from "./errors";

describe.concurrent("HttpError", () => {
  const testStatus = "01";
  const testMessage = "test";
  const testData = "data1";
  const newInput = new HttpError(testStatus, testMessage, testData);
  const blankInput = new HttpError();

  it("should return the exact status code which is written", () => {
    expect(newInput.statusCode).toBe("01");
  });

  it("should return the exact message which is written", () => {
    expect(newInput.message).toBe("test");
  });

  it("should return the exact data which is written", () => {
    expect(newInput.data).toBe("data1");
  });

  it("should be defined even if the inputs are empty", () => {
    expect(blankInput).toBeDefined();
  });

  it("should contain undefined as data if no data is provided", () => {
    expect(blankInput.data).toBeUndefined();
  });
});

describe.concurrent("ValidationError", () => {
  it("should assess the message given", () => {
    const inputMessage = new ValidationError("error");

    expect(inputMessage.message).toBe("error");
  });

  it("should have the message undefined if the input is empty", () => {
    const blankInputMessage = new ValidationError();

    expect(blankInputMessage.message).toBeUndefined();
  });
});
