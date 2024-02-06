//Leaflet window fix
export const emulateBrowserInSSR = () => {

    if (typeof window === 'undefined') {
        global.window = {
            screen: {}
        };
    }

    if (typeof navigator === 'undefined') {
        global.navigator = {
            userAgent: "fake",
            platform: "fake"
        };
    }

    if (typeof document === 'undefined') {
        global.document = {
            documentElement: {
                style: {}
            },
            createElement: () => {
                return { getContext: {} };
            },
            getDocument: () => { return {}; }
        };
    }
}
