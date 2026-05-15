import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { Footer } from "@/common/components/Footer/Footer";
import { Header } from "@/common/components/Header/Header";
import { getTheme, type ThemeMode } from "@/common/theme/theme";
import { AppRouter } from "@/app/router";

export function App() {
    const [mode, setMode] = useState<ThemeMode>("dark");
    const theme = getTheme(mode);
    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ minHeight: "100vh", bgcolor: "background.default", display: "flex", flexDirection: "column" }}>
                <Header mode={mode} onToggleTheme={toggleTheme} />
                <Box sx={{ flex: 1 }}>
                    <AppRouter />
                </Box>
                <Footer mode={mode} />
            </Box>
        </ThemeProvider>
    );
}