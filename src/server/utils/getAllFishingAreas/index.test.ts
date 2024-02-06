import { getAllFishingAreas } from "./index";

describe("getAllFishingAreas", () => {
  test("getAllFishingAreas ", async () => {
    const fishingAreas = await getAllFishingAreas();
    expect(fishingAreas.length).toBeGreaterThan(0);
  });
});
