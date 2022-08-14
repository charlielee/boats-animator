import { makeTake } from "./projectBuilder";

it("should make take", () => {
  const workingDirectory = "hello";
  const shotNumber: number = 1;
  const takeNumber = 1;
  const frameRate = 15;

  expect(makeTake(workingDirectory, shotNumber, takeNumber, frameRate)).toBe(
    true
  );
});
