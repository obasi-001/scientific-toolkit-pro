import { Link } from "react-router-dom";
import {
    FaCalculator,
    FaGlobe,
    FaMoneyBillWave,
    FaRobot,
} from "react-icons/fa";

const footerLinks = [
    {
        to: "/calculator",
        label: "Calculator",
        icon: <FaCalculator />,
    },
    {
        to: "/currency",
        label: "Currency",
        icon: <FaMoneyBillWave />,
    },
    {
        to: "/translator",
        label: "Translator",
        icon: <FaGlobe />,
    },
    {
        to: "/ai",
        label: "AI Assistant",
        icon: <FaRobot />,
    },
];

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="dashboard-footer">
            <div className="dashboard-footer-inner">
                <div className="dashboard-footer-brand">
                    <div className="dashboard-footer-copy">
                        <strong className="dashboard-footer-title">
                            <span
                                className="dashboard-footer-mark"
                                aria-hidden="true"
                            >
                                <FaCalculator />
                            </span>
                            Scientific Toolkit Pro
                        </strong>

                        <span>
                            &copy; {year} Scientific Toolkit Pro. All rights reserved.
                        </span>

                        <p>
                            Developed by Okwi Int'l Tech
                        </p>
                    </div>
                </div>

                <nav
                    className="dashboard-footer-links"
                    aria-label="Dashboard footer navigation"
                >
                    {footerLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className="dashboard-footer-link"
                        >
                            <span aria-hidden="true">
                                {link.icon}
                            </span>
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="dashboard-footer-status">
                    <span
                        className="dashboard-footer-status-dot"
                        aria-hidden="true"
                    />
                    Ready
                </div>
            </div>
        </footer>
    );
};

export default Footer;
