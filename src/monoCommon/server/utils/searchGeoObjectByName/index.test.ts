import { search } from "./index";

describe("Vandens telkinkio paieška ", () => {
  test("ežeras", async () => {

    const resp = await search("Galv");
    expect(resp.ezeraiTvenkiniai.length > 0).toBe(true);
  });
  test("upė", async () => {

    const resp = await search("Nemunas");
    expect(resp.upesKanalai.length > 0).toBe(true);
  });
  test("savival", async () => {

    const resp = await search("Plung");
    expect(resp.savivaldybes.length > 0).toBe(true);
  });
  test("baras", async () => {

    const resp = await search("baras 1");
    expect(resp.baraiMariose.length > 0).toBe(true);
  });
});
