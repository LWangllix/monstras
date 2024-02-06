import { getRivers } from "./index";

describe("Pratekantis telkinys iš kordinatės ", () => {
  test("telkinys", async () => {

    const InfoAboutRiver = await getRivers({
      lat: 54.936106,
      lng: 23.726544
    });
    expect(InfoAboutRiver[0].properties.PAVADINIMA).toBe("Nemunas");
  });
});
