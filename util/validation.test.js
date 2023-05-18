import { it, expect } from "vitest";

import { validateNotEmpty } from "./validation";

it("should yield an error if theres no text", () => {
  const emptyStringInput = "";

  const textFn = () => {
    validateNotEmpty(emptyStringInput);
  };

  expect(textFn).toThrow();
});

it("should yield an error if theres no text but only blank space", () => {
  const emptyStringInput = "    ";

  const textFn = () => {
    validateNotEmpty(emptyStringInput);
  };

  expect(textFn).toThrow();
});

it("should not throw an error if the text is legit", () => {
  const textFn = () => {
    validateNotEmpty("Test", "error");
  };

  expect(textFn).not.toThrow();
});

it("should throw an error with the provided message the user entered", () => {
  const testInput = "";
  const errorMessage = "Could not be validated. Try again!";

  const validationTestFn = () => validateNotEmpty(testInput, errorMessage);

  expect(validationTestFn).toThrow(errorMessage);
});
