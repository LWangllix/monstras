import { getMunicipalityFromPoint } from "./index";

describe("getMunicipalityFromPoint test", () => {
  test("getMunicipalityFromPoint", async () => {
    const getMunicipalityFromPoint0 = await getMunicipalityFromPoint({
      lat: 54.8926772,
      lng: 23.2922467,
    });

    expect(getMunicipalityFromPoint0[0].label).toBe("Šakių r. sav.");
    const getMunicipalityFromPoint1 = await getMunicipalityFromPoint({
      lat: 55.1026772,
      lng: 22.3022467,
    });
    expect(getMunicipalityFromPoint1[0].label).toBe("Jurbarko r. sav.");
  });
});
