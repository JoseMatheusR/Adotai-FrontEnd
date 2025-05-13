import {
  Components,
  createTheme,
  PaletteColorOptions,
  PaletteOptions,
  Theme,
} from "@mui/material/styles";

export const palette: PaletteOptions = {
  primary: {
    main: "#E67E22",
    light: "#F39C12",
    dark: "#D35400",
  },
  secondary: {
    main: "#5D4037",
    light: "#8D6E63",
    dark: "#3E2723",
  },
  text: {
    primary: "#5D4037",
    secondary: "#795548",
    disabled: "#A1887F",
  },
  background: {
    default: "#FEF6E9",
    paper: "#FFF8EE",
  },
  divider: "#EADDCA",
};

export const components: Components<Omit<Theme, "components" | "palette">> = {
  MuiTextField: {
    defaultProps: {
      size: "small",
    },
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-root": {
          height: "50px",
          fontSize: "0.875rem",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#EFC7A9",
            borderWidth: "3px",
            borderRadius: "8px",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor:
              palette.primary?.["light" as keyof PaletteColorOptions],
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: palette.primary?.["main" as keyof PaletteColorOptions],
          },
        },
        "& .MuiOutlinedInput-input": {
          padding: "8px 12px",
          color: palette.text?.primary,
        },
        "& .MuiInputLabel-root": {
          top: "4px",
          fontSize: "0.75rem",
          color: "#b38e81",
          "&.Mui-focused": {
            color: palette.primary?.["main" as keyof PaletteColorOptions],
          },
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-notchedOutline": {
          borderRadius: "8px",
        },
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        height: "46px",
        borderRadius: "8px",
        backgroundColor: "#E67E22",
        color: "#FFFFFF",
        fontFamily: "'Baloo 2', cursive",
        fontWeight: 600,
        textTransform: "none",
        "&:hover": {
          backgroundColor: "#D35400",
        },
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        fontFamily: "'Baloo 2', cursive",
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  MuiLink: {
    styleOverrides: {
      root: {
        color: "#E67E22",
        textDecoration: "none",
        fontWeight: 600,
        "&:hover": {
          textDecoration: "underline",
        },
      },
    },
  },
};

export const theme = createTheme({
  palette: palette,
  components: components,
  typography: {
    fontFamily: "'Baloo', 'Arial', 'Helvetica', sans-serif",
    h5: {
      fontWeight: 700,
      color: "#5D4037",
    },
    subtitle1: {
      fontWeight: 500,
      color: "#5D4037",
    },
    subtitle2: {
      fontWeight: 600,
      color: "#5D4037",
    },
    button: {
      fontWeight: 600,
    },
  },
});
