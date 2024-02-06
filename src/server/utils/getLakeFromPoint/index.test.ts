import { getLakeFromPoint } from "./index";

describe("Lake from point", () => {
  test("Get lake from point ", async () => {
    const InfoAboutLake = await getLakeFromPoint({
      lat: 54.894843,
      lng: 24.063956
    });
    expect(InfoAboutLake[0].properties.PAVADINIMA).toBe("Kauno HE tvenkinys");
  });
});
