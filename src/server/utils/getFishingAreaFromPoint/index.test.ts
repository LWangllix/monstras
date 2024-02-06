import { getFishingAreaFromPoint } from "./index";

describe("Get fishing area point", () => {
  test("Get get fishing area from point ", async () => {
    const info = await getFishingAreaFromPoint({
      lat: 55.40345542364106279,
      lng: 21.16114315099224186
    });
    expect(info?.properties?.name).toBe("baras 44");
  });
});
