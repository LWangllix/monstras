import dotenv from "dotenv";

export default (checkKeys: Array<string> = []) => {
    const path = `./env/` + process.env.NODE_ENV + ".env";
    dotenv.config({ path });
    checkKeys.forEach((key) => {
        if (!process.env[key]) {
            console.trace(process.env);
            throw new Error(`${key} is not defined`);
        }
    });
}

