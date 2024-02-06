import { RouterEndpoint } from "../../Endpoint";
import RouterError from "../../RouterError";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import localize from "./ajv-i18n/localize/lt/index";
const validators = new Map<string, (params: any) => Promise<RouterError>>([]);

export const jsonValidate = async (endPoint: RouterEndpoint, params: any): Promise<RouterError> => {
    if (endPoint.schema) {
        if (!validators.has(endPoint.path)) {
            const ajv = new Ajv({ allErrors: true, messages: false, strictSchema: false });
            addFormats(ajv);
            ajv.addFormat("asmensKodas", {
                type: "string",
                validate: function (code: string) {
                    return /^[0-9]{11}$/.test(code);
                },
            });
            const ajValidate = ajv.compile(endPoint.schema);
            const validate = async (params): Promise<RouterError> => {
                try {
                    await ajValidate(params);
                } catch (err) {
                    localize(err.errors);
                    const e = new RouterError(200, err.errors.map(e => { return { key: e.instancePath.replace("/", ""), msgs: [e.message] }; }));
                    return e;
                }
                return null;
            };
            validators.set(endPoint.path, validate);
        }
        const validate = validators.get(endPoint.path);
        const error = validate && await validate(params);
        return error;
    }
};
