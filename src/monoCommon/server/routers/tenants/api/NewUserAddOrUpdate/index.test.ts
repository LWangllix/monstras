import { validate } from "./index"

describe("True", () => {
    test("True ", async () => {
        const error = await validate({
            id: "1",
            code: "9999961",
            name: "ass",
            email: "aato@mas.lt",
            lastName: "asss",
            phone: "pheaa"
        })

        expect(!!error).toBeTruthy();
    });
});
