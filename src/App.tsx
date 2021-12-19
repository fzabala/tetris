import React from "react";
import CanvasGame from "components/CanvasGame";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { customTheme } from "themes/customTheme";
import { Provider } from "react-redux";
import { store } from "store";

function App() {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <ThemeProvider theme={customTheme}>
                    <CanvasGame />
                    <CssBaseline />
                </ThemeProvider>
            </Provider>
        </React.StrictMode>
    );
}

export default App;
