import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import CalculatorPage from "./pages/Calculator";
import Currency from "./pages/Currency";
import UnitConverter from "./pages/UnitConverter";
import Weather from "./pages/Weather";
import Translator from "./pages/Translator";
import History from "./pages/History";
import Clock from "./pages/Clock";
import Settings from "./pages/Settings";

function App() {
    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Home />} />
                    <Route path="/calculator" element={<CalculatorPage />} />
                    <Route path="/currency" element={<Currency />} />
                    <Route
                        path="/unit-converter"
                        element={<UnitConverter />}
                    />
                    <Route path="/weather" element={<Weather />} />
                    <Route
                        path="/translator"
                        element={<Translator />}
                    />
                    <Route path="/history" element={<History />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/clock" element={<Clock />} />
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
}

export default App;