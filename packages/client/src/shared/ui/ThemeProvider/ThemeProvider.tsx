import { createTheme, ThemeProvider } from "@mui/material";
import { PropsWithChildren } from "react";
import { getTelegramObject } from "shared/lib/getTelegramObject";

const themeParams = getTelegramObject().WebApp.themeParams;

const theme = createTheme({
  typography: {
    fontSize: 10,
  },
  palette: {
    primary: {
      main: themeParams.button_color || "#000",
      contrastText: themeParams.button_text_color,
    },
    text: {
      primary: themeParams.text_color,
      secondary: themeParams.hint_color,
    },
    background: {
      default: themeParams.bg_color,
      paper: themeParams.bg_color,
    },
    divider: themeParams.section_separator_color,
  },
});

export const TelegramThemeProvider = ({ children }: PropsWithChildren) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
