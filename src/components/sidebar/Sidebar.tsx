import {
    FaHome,
    FaCalculator,
    FaMoneyBillWave,
    FaRulerCombined,
    FaCloudSun,
    FaGlobe,
    FaHistory,
    FaCog,
    FaClock,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
}


const Sidebar = ({ isOpen }: SidebarProps) => {
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
            icon: <FaClock />,
            label: "Clock",
            path: "/clock",
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
        <aside className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
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