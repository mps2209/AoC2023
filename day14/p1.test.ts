// calculator.test.ts
import { Platform, PlatformFactory, rollRocks } from "./platform";
import { readInput } from "./main";
import {
  inputString,
  tiltedPlatform,
  tiltedinputString,
  untiltedPlatform,
} from "./test_data";

test("readInput", async () => {
  try {
    const result = await readInput("test_input.txt");
    expect(result).toBe(inputString);
  } catch (error) {
    // Handle any errors, or rethrow them if needed
    throw error;
  }
});

test("createPlatform", () => {
  const platform: Platform =
    PlatformFactory.constructPlatform(tiltedinputString);
  expect(platform.configuration).toStrictEqual(tiltedPlatform);
});
test("calculateWeight", () => {
  const platform: Platform = new Platform(tiltedPlatform);
  expect(platform.weight).toBe(136);
});
test("tiltPlatform", () => {
  const platform: Platform = new Platform(untiltedPlatform);
  platform.tiltPlatform();
  expect(platform.configuration).toStrictEqual(tiltedPlatform);
});
test("rollRocks", () => {
  const rolledConfig = rollRocks(
    untiltedPlatform[0].split(""),
    untiltedPlatform[1].split("")
  );
  expect(rolledConfig.lower).toBe("O.OO.#....");
  expect(rolledConfig.upper).toBe("O...#....#");
});
test("tiltedPlatformWeight", () => {
  const platform: Platform = new Platform(untiltedPlatform);
  platform.tiltPlatform();
  expect(platform.weight).toBe(136);
});
