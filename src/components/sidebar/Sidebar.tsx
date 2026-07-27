import {
    FaHome,
    FaCalculator,
    FaMoneyBillWave,
    FaRulerCombined,
    FaCloudSun,
    FaGlobe,
    FaHistory,
    FaCog,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";


const Sidebar = () => {
    const menus = [
        {
            icon: <FaHome />,
            label: "Dashboard",
            path: "/dashboard",
        },
        {
            icon: <FaCalculator />,
            label: "Calculator",
            path: "/calculator",
        },
        {
            icon: <FaMoneyBillWave />,
            label: "Currency",
            path: "/currency",
        },
        {
            icon: <FaRulerCombined />,
            label: "Unit Converter",
            path: "/unit-converter",
        },
        {
            icon: <FaCloudSun />,
            label: "Weather",
            path: "/weather",
        },
        {
            icon: <FaGlobe />,
            label: "Translator",
            path: "/translator",
        },
        {
            icon: <FaHistory />,
            label: "History",
            path: "/history",
        },
        {
            icon: <FaCog />,
            label: "Settings",
            path: "/settings",
        },
    ];

    return (
        <aside className="sidebar">
            <ul>
                {menus.map((menu) => (
                    <li key={menu.label}>
                        <NavLink
                            to={menu.path}
                            className={({ isActive }) =>
                                isActive ? "sidebar-link active" : "sidebar-link"
                            }
                        >
                            {menu.icon}
                            <span>{menu.label}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;