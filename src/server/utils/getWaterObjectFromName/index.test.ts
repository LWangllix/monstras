import { geUETObjectByName } from "./index";

describe("Vandens telkinkio paieška ", () => {
  test("ežeras", async () => {

    const resp = await geUETObjectByName("Galv");
    expect(resp.length > 0).toBe(true);
  });
  test("upė", async () => {

    const resp = await geUETObjectByName("Nemunas");
    expect(resp.length > 0).toBe(true);
  });
});
