import { beforeEach, describe, expect, it } from "vitest";
import { extractPostData } from "./posts";

const testTitle = "Test title";
const testContent = "Test content";
let testFormData;

describe("expractPostData()", () => {
  beforeEach(() => {
    testFormData = "";
  });

  it("should extract title and content from the provided form data", () => {
    testFormData = {
      //this is my helper object/ dummy object
      title: testTitle,
      content: testContent,
      get(key) {
        return this[key];
      },
    };

    const data = extractPostData(testFormData);

    expect(data.title).toBe(testTitle);
    expect(data.content).toBe(testContent);
  });
});
