// color design tokens export
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    100: "#F3F3F3",
    200: "#CECECE",
    300: "#BBBBBB",
    400: "#A8A8A8",
    500: "#696969",
    600: "#565656",
    700: "#373737",
    800: "#1C1C1E",
    900: "#222222",
    1000: "#2F2F2F",
    1100: "#000000",
  },
  primary: {
    0: "#FF7E5F",
    50: "#FEB47B",
  },
};

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            primary: {
              light: colorTokens.primary[0],
              main: colorTokens.primary[50],
            },
            neutral: {
              line: colorTokens.grey[400],
              menuText: colorTokens.grey[0],
              title: colorTokens.grey[1100],
              calendar: colorTokens.grey[100],
              dates: colorTokens.grey[600],
              description: colorTokens.grey[300],
              popUpText: colorTokens.grey[300],
              popUp: colorTokens.grey[0],
              hover: colorTokens.grey[1000],
              menu: colorTokens.grey[800],
            },
            background: {
              default: colorTokens.grey[0],
              menu: colorTokens.grey[800],
              drawer: colorTokens.grey[0],
            },
          }
        : {
            // palette values for dark mode
            primary: {
              light: colorTokens.primary[0],
              main: colorTokens.primary[50],
            },
            neutral: {
              line: colorTokens.grey[400],
              menuText: colorTokens.grey[0],
              title: colorTokens.grey[0],
              calendar: colorTokens.grey[700],
              dates: colorTokens.grey[0],
              description: colorTokens.grey[200],
              popUpText: colorTokens.grey[500],
              popUp: colorTokens.grey[800],
              hover: colorTokens.grey[1000],
              menu: colorTokens.grey[800],
            },
            background: {
              default: colorTokens.grey[900],
              menu: colorTokens.grey[800],
              drawer: colorTokens.grey[800],
            },
          }),
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
