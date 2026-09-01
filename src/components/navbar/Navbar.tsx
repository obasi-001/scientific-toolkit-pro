import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext";


interface NavbarProps {
    isSidebarOpen: boolean;
    onToggleSidebar: () => void;
}


const Navbar = ({
    isSidebarOpen,
    onToggleSidebar,
}: NavbarProps) => {

    const { theme, toggleTheme } = useTheme();

    const isDark = theme === "dark";


    return (
        <nav className="navbar navbar-expand-lg shadow-sm px-4 py-3">

            <button
                type="button"
                className="btn btn-outline-primary me-3"
                onClick={onToggleSidebar}
                aria-label={
                    isSidebarOpen
                        ? "Close sidebar"
                        : "Open sidebar"
                }
            >
                <FaBars />
            </button>


            <h4 className="m-0 fw-bold flex-grow-1">
                Scientific Toolkit Pro
            </h4>


            <button
                type="button"
                className="btn btn-dark"
                onClick={toggleTheme}
                aria-label={
                    isDark
                        ? "Switch to light mode"
                        : "Switch to dark mode"
                }
            >
                {isDark ? (
                    <BsSunFill />
                ) : (
                    <BsMoonStarsFill />
                )}
            </button>

        </nav>
    );
};


export default Navbar;