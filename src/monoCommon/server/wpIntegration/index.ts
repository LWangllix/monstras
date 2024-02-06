import axios from "axios";
import { ca } from "date-fns/locale";
import { Express } from "express";
const { createProxyMiddleware } = require('http-proxy-middleware');



const WP_URL = process.env.WP_URL;
if (!WP_URL) {
    throw new Error("WP_URL is not defined");
}
interface Source {
    path: string, content: string
}
let sources: Array<Source> = [];

const pagesPaths = ["/"]

const getPage = async (path: string): Promise<Source> => {
    const content = (await axios.get(`${WP_URL}${path}`)).data;
    return { path, content };
}
const refreshSources = async () => {
    try {
        sources = await Promise.all(pagesPaths.map(getPage))
    } catch (error) {
    }
    setTimeout(() => {
        refreshSources();
    }, 5 * 1000);
};

export const integrateWP = (app: Express) => {
    refreshSources();


    app.use("/wp-content", createProxyMiddleware({ target: `${WP_URL}`, changeOrigin: true }));
    app.use("/wp-includes", createProxyMiddleware({ target: `${WP_URL}`, changeOrigin: true }));


    app.use(async (req, res, next) => {
        const wpPage = sources.find(s => s.path == req.path);
        wpPage ? res.send(wpPage.content) : next();
    });
}