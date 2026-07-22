import { FaBars } from "react-icons/fa";
import { BsMoonStarsFill } from "react-icons/bs";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg shadow-sm px-4 py-3 bg-white">
            <button
                className="btn btn-outline-primary me-3"
            >
                <FaBars />
            </button>
            <h4 className="m-0 fw-bold flex-grow-1">
                Scientific Toolkit Pro
            </h4>

            <button
                className="btn btn-dark"
            >
                <BsMoonStarsFill />
            </button>
        </nav>
    );
};

export default Navbar;