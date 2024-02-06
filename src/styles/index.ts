import { createGlobalStyle } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    delete: string;
    hover: {
      primary: string;
      secondary: string;
      tertiary: string;
      delete: string;
    };
    tertiaryMedium: string;
    tertiaryLight: string;
    new: string;
    not_finished: string;
    finished: string;
    approved: string;
    late: string;
    input: string;
    border: string;
    borderBackground: string;
    label: string;
    error: string;
    light: string;
    white: string;
    darkerWhite: string;
    pending: string;
    grey: string;
    endFishing: string;
    startFishing: string;
    fishWeightOnBoat: string;
    fishWeightOnShore: string;
    builtTools: string;
    tansparent: string;
  };
}

export const theme: Theme = {
  colors: {
    primary: "#121A55",
    secondary: "#13C9E7",
    tertiary: "#7A7E9F",
    tansparent: "transparent",
    delete: "#FE5B78",
    hover: {
      primary: "#13C9E7",
      secondary: "#13C9E78F",
      tertiary: "#7A7E9F",
      delete: "#FE5B78E6",
    },
    tertiaryMedium: "#C6C8D6",
    tertiaryLight: "#F3F3F7",
    new: "#00cae9",
    not_finished: "#FC9C04",
    finished: "#60b456",
    approved: "#60b456",
    late: "#FE5B78",
    input: "#F3F3F7",
    border: "#121A553D",
    borderBackground: "#F3F3F7",
    fishWeightOnBoat: "#13C9E7",
    builtTools: "#6F7DE5",
    label: "#0B1F51",
    error: "#FE5B78",
    light: "#f3f3f7",
    white: "#ffffff",
    darkerWhite: "#A4A7BD",
    pending: "#fea700",
    grey: "#B3B5C4",
    endFishing: "#FE5B78",
    startFishing: "#FC9C04",
    fishWeightOnShore: "#60B158",
  },
};

export const GlobalStyle = createGlobalStyle`
  html { 
    font-size: 62.5%; 
    width: 100vw;
    height: 100vh;
  }
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Manrope', sans-serif;
    background-color: #E5E5E5;
    font-size: 1.6rem;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  } 
  html,

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}
  h1 {
    font-size: 3.2rem;
    color: "#121A55";
  }
  button {
    outline: none;
    text-decoration: none;
    display: block;
    border: none;
    background-color: transparent;
  }
  #__next {
    height: 100%;
  }
  textarea {
    font-size: 1.6rem;
    font-family: 'Manrope', sans-serif;
  }
  input[type="radio"] {
    display: none;
  }
  input[type="radio"] + *::before {
    content: "";
    display: inline-block;
    width: 1.5rem;
    vertical-align: middle;
    height: 1.5rem;
    margin-right: 1rem;
    border-radius: 50%;
    border-style: solid;
    border-width: 0.1rem;
    border-color: #121A55;
  }
  input[type="radio"]:checked + *::before {
    background: radial-gradient(#121A55 0%, #121A55 40%, transparent 50%, transparent);
    border-color: #121A55;
  }
  input[type="radio"] + * {
    display: inline-block;
    padding: 0.5rem 1rem;
  }
`;

export const device = {
  mobileS: `(max-width: 321px)`,
  mobileM: `(max-width: 426px)`,
  mobileL: `(max-width: 768px)`,
  tablet: `(max-width: 1024px) and (min-width: 769px)`,
};

export const MIN_CONTENT_SIZE_PX = 768;
