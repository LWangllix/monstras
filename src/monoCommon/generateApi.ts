import fs from "fs-extra"

const routerPaths = ["./src/server/routers/", "./src/monoCommon/server/routers/", "./src/BPMN/biipform/routes/"];
interface ApiMethod {
    method: string
    dir: string
    path: string
}
const apiMethods: {
    [key: string]: {
        [key: string]: ApiMethod
    };
} = {};

const api = routerPaths.flatMap(path => fs.readdirSync(path).filter(d => {
    if (fs.existsSync(path + d + "/api")) {
        return true;
    } 
}).map(d => path + d + "/api")
).flatMap(d => fs.readdirSync(d).map(f => d + "/" + f)).map(p => {
    const paths = p.split("/");
    return {
        method: paths.slice(-1)[0],
        dir: paths.slice(-3)[0],
        path: p
    }
});

api.forEach(a => {
    apiMethods[a.dir] = {};
})

api.forEach(
    a => {
        if (apiMethods[a.dir][a.method]) {
         //   throw new Error(`duplicate method ${a.method} in ${a.dir}`);
        } else {
            apiMethods[a.dir][a.method] = a;
        }
    }
);


function cap(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const frontEnd = () => {
    let source = `import call from "../../monoCommon/utils/call";
 `;
    Object.keys(apiMethods).forEach(dir => {
        Object.keys(apiMethods[dir]).forEach(m => {
            const name = `${cap(dir)}${cap(m)}`;
            const method = apiMethods[dir][m];
            source += `import { Params as ${name}Params, endPoint as ${name}EndPoint, Result as ${name}Result } from "./../../../${method.path}/config";
`;

        });
    });


    let callObject = `

export default {
    `;

    Object.keys(apiMethods).forEach(dir => {
        callObject += `${dir}:{
        `;
        Object.keys(apiMethods[dir]).forEach(m => {
            const method = apiMethods[dir][m];

            const name = `${cap(dir)}${cap(m)}`;
            callObject += `${m}: (params: ${name}Params) => call<${name}Params, ${name}Result>({ ...${name}EndPoint, path: "/api/${method.dir}/${method.method}" }, params),
        `;
        });
        callObject += `},
    `;
    });
    callObject += `};`;
    source += callObject;
    const filePath = `./src/server/routers/api.ts`
    fs.createFileSync(filePath)
    fs.outputFileSync(filePath, source, "utf8")
}


const backend = () => {
    let source = `
import express, { Router } from "express";
import { registerEndpoint } from "../../monoCommon/registerEndpoint";    

`;
    Object.keys(apiMethods).forEach(dir => {
        Object.keys(apiMethods[dir]).forEach(m => {
            const method = apiMethods[dir][m];
            source += `import { method as ${(dir)}${cap(method.method)}Method } from "./../../../${method.path}/index";
import { endPoint as ${dir}${cap(method.method)}EndPoint } from "./../../../${method.path}/config";
`;
        });
    });
    source += `

const router: Router = express.Router();
`;

    Object.keys(apiMethods).forEach(dir => {
        Object.keys(apiMethods[dir]).forEach(m => {
            const method = apiMethods[dir][m];
            source += `
registerEndpoint(router, { ...${(dir)}${cap(method.method)}EndPoint, path: "/api/${(dir)}/${cap(method.method)}" }, ${(dir)}${cap(method.method)}Method);`;
        });
    });
    source += `
export default router;`;
    const filePath = `./src/server/routers/apiRouter.ts`
    fs.createFileSync(filePath)
    fs.outputFileSync(filePath, source, "utf8")

};

backend();
frontEnd();
console.log(`generated ${api.length} api endpoints`);
