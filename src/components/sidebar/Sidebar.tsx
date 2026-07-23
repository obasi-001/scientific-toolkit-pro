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


const Sidebar = () => {
    const menus = [
        { icon: <FaHome />, label: "Dashboard" },
        { icon: <FaCalculator />, label: "Calculator" },
        { icon: <FaMoneyBillWave />, label: "Currency" },
        { icon: <FaRulerCombined />, label: "Unit Converter" },
        { icon: <FaCloudSun />, label: "Weather" },
        { icon: <FaGlobe />, label: "Translator" },
        { icon: <FaHistory />, label: "History" },
        { icon: <FaCog />, label: "Settings" }
    ];

    return (
        <aside className="sidebar">
            <ul>
                {menus.map((menu) => (
                    <li key={menu.label}>
                        {menu.icon}
                        <span>{menu.label}</span>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;