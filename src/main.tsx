import React from "react";
import ReactDOM from "react-dom/client";


import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PreferencesProvider } from "./contexts/PreferencesContext";
import { ToastProvider } from "./contexts/ToastContext";
import { AuthProvider } from "./contexts/AuthContext";

import { HistoryProvider } from "./contexts/HistoryContext";
import "./styles/variables.css";
import "./styles/globals.css";
import "./styles/layout.css";
import "./styles/responsive.css";
import "./styles/animations.css";
import "./styles/buttons.css";
import "./styles/navbar.css";
import "./styles/sidebar.css";
import "./styles/calculator.css";
import "./styles/display.css";
import "./styles/weather.css";
import "./styles/language.css";
import "./styles/history.css";
import "./styles/settings.css";
import "./styles/footer.css";
import "./styles/dashboard.css";



ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider>
            <PreferencesProvider>
                <HistoryProvider>
                    <ToastProvider>
                        <AuthProvider>
                            <App />
                        </AuthProvider>
                    </ToastProvider>
                </HistoryProvider>
            </PreferencesProvider>
        </ThemeProvider>
    </React.StrictMode>
);
