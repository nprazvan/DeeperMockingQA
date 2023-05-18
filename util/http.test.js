import { it, vi, expect } from "vitest";
import { sendDataRequest } from "./http";
import { HttpError } from "./errors";

const testResponseData = { testKey: "testData" };
const testFetch = vi.fn((url, options) => {
  return new Promise((res, rej) => {
    if (typeof options.body !== "string") {
      return rej("Not a string.");
    }
    const testResponse = {
      ok: true,
      json() {
        return new Promise((res, rej) => {
          res(testResponseData);
        });
      },
    };

    res(testResponse);
  });
});

vi.stubGlobal("fetch", testFetch);

it("should return any available response data", () => {
  const testData = { key: "test" };

  return expect(sendDataRequest(testData)).resolves.toEqual(testResponseData);
});

it("should convert the provided data to JSON before sending the request", async () => {
  const testData = { key: "test" };

  let errorMessage;

  try {
    await sendDataRequest(testData);
  } catch (err) {
    errorMessage = err;
  }

  expect(errorMessage).not.toBe("Not a string.");
});

it("should throw an HttpError in case of non-ok responses", () => {
  testFetch.mockImplementationOnce((url, options) => {
    return new Promise((res, rej) => {
      const testResponse = {
        ok: false,
        json() {
          return new Promise((res, rej) => {
            res(testResponseData);
          });
        },
      };

      res(testResponse);
    });
  });

  const testData = { key: "test" };

  return expect(sendDataRequest(testData)).rejects.toBeInstanceOf(HttpError);
});
