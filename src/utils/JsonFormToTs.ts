import _ from "lodash";
const JsonToTS = require('json-to-ts');


function getDeepKeys(obj, path = [], keys = []): Array<{ path: Array<number | string>, type: string }> {
    const objectInv = obj.properties;
    if (!objectInv) {
        return keys;
    }
    return [...Object.keys(objectInv).flatMap(key => {
        const type = objectInv[key].type;
        const objetChild = type === "object" ? getDeepKeys(objectInv[key], [...path, key], keys) : [];
        const arrayChild = type === "array" ? getDeepKeys(objectInv[key].items, [...path, key, 0], [...keys, objetChild]) : objetChild;
        return [{ path: [...path, key], type }, ...arrayChild];
    })];
}

function getSampleObject(obj) {
    const deep = getDeepKeys(obj).sort((a, b) => a.path.length - b.path.length);
    const result = {};
    deep.forEach(o => {
        if (o.type === "string") {
            _.set(result, o.path, "string");
        }
    });
    return result;
}

const JsonFormToTs = (jsonForm: any): Array<string> => {
    const sampleObject = getSampleObject(jsonForm);
    return JsonToTS(sampleObject);
}

export default JsonFormToTs;
