import { createTheme, ThemeOptions } from "@mui/material";

export const themeConfig: ThemeOptions = {};
themeConfig.spacing = (factor: number) => [0, 4, 8, 16, 24, 32, 64][factor];
themeConfig.breakpoints = {
    values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
    },
};
themeConfig.palette = {
    background: {
        paper: "white",
        default: "rgb(244, 245, 247)",
    },
    primary: {
        main: "#5664D2",
        light: "#7783DB",
        dark: "#3C4693",
        contrastText: "#fff",
    },
    secondary: {
        main: "#E34736",
        light: "#e86b5e",
        dark: "#9e3125",
        contrastText: "#fff",
    },
    success: {
        main: "#4caf50",
        light: "#80e27e",
        dark: "#087f23",
        contrastText: "#fff",
    },
};
themeConfig.typography = {
    fontFamily: ["Lato", "sans-serif"].join(","),
    h1: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontWeight: 700,
        color: themeConfig.palette.text?.primary,
    },
    h2: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontWeight: 700,
        color: themeConfig.palette.text?.primary,
    },
    h3: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontWeight: 700,
        color: themeConfig.palette.text?.primary,
    },
    h4: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontWeight: 700,
        color: themeConfig.palette.text?.primary,
    },
    h5: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontWeight: 700,
        color: themeConfig.palette.text?.primary,
    },
    h6: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontWeight: 700,
        color: themeConfig.palette.text?.primary,
    },
    body1: {
        color: themeConfig.palette.text?.primary,
    },
    body2: {
        color: themeConfig.palette.text?.secondary,
    }
};
themeConfig.components = {
    MuiButtonBase: {
        defaultProps: {
            disableRipple: true,
        }
    }
};

export const customTheme = createTheme(themeConfig);
