import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/navbar/Navbar"; 
import Sidebar from "../components/sidebar/Sidebar"; 
 
interface MainLayoutProps { 
    children: ReactNode; 
} 

const MOBILE_FIT_ROUTES = new Set([
    "/dashboard",
    "/currency",
    "/unit-converter",
    "/weather",
    "/translator",
    "/clock",
    "/ai",
]);
 
const MainLayout = ({ children }: MainLayoutProps) => { 
    const location = useLocation();
    const isCalculatorRoute = location.pathname === "/calculator";
    const isAIRoute = location.pathname === "/ai";
    const isMobileFitRoute = MOBILE_FIT_ROUTES.has(location.pathname);

    const [isSidebarOpen, setIsSidebarOpen] = useState(() => { 
        return window.innerWidth >= 992; 
    }); 


    useEffect(() => { 
        const isMobile = window.innerWidth < 992; 
        const shouldFreezePage = isMobile && isSidebarOpen;
        const shouldHideOverflow = isCalculatorRoute || shouldFreezePage;
        const scrollY = window.scrollY;

        const previousHtmlOverflow = document.documentElement.style.overflow;
        const previousBodyOverflow = document.body.style.overflow;
        const previousBodyPosition = document.body.style.position;
        const previousBodyTop = document.body.style.top;
        const previousBodyLeft = document.body.style.left;
        const previousBodyRight = document.body.style.right;
        const previousBodyWidth = document.body.style.width;

        if (shouldHideOverflow) {
            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = "hidden";
        }

        if (shouldFreezePage) {
            document.documentElement.classList.add("sidebar-scroll-lock");
            document.body.classList.add("sidebar-scroll-lock");
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = "0";
            document.body.style.right = "0";
            document.body.style.width = "100%";
        } else {
            document.documentElement.classList.remove("sidebar-scroll-lock");
            document.body.classList.remove("sidebar-scroll-lock");
        } 

        return () => { 
            document.documentElement.style.overflow = previousHtmlOverflow;
            document.body.style.overflow = previousBodyOverflow;
            document.body.style.position = previousBodyPosition;
            document.body.style.top = previousBodyTop;
            document.body.style.left = previousBodyLeft;
            document.body.style.right = previousBodyRight;
            document.body.style.width = previousBodyWidth;
            document.documentElement.classList.remove("sidebar-scroll-lock");
            document.body.classList.remove("sidebar-scroll-lock");

            if (shouldFreezePage) {
                window.scrollTo(0, scrollY);
            }
        }; 
    }, [isSidebarOpen, isCalculatorRoute]);
 
 
    const handleToggleSidebar = () => { 
        setIsSidebarOpen((previous) => !previous);
    }; 
 
 
    const handleCloseSidebar = () => { 
        setIsSidebarOpen(false); 
    }; 
 
 
    return ( 
        <div
            className={`app ${isCalculatorRoute ? "app-calculator-mode" : ""} ${
                isMobileFitRoute ? "app-mobile-fit-mode" : ""
            } ${isAIRoute ? "app-ai-mode" : ""}`}
        >
            <Navbar
                isSidebarOpen={isSidebarOpen}
                onToggleSidebar={handleToggleSidebar}
            />
 
            <div className="main-layout"> 
                {isSidebarOpen && (
                    <button
                        type="button"
                        className="sidebar-backdrop"
                        onClick={handleCloseSidebar}
                        aria-label="Close sidebar"
                    />
                )}

                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={handleCloseSidebar}
                />
 
                <main
                    className={`dashboard ${
                        isCalculatorRoute ? "dashboard-calculator-mode" : ""
                    } ${isMobileFitRoute ? "dashboard-mobile-fit-mode" : ""} ${
                        isAIRoute ? "dashboard-ai-mode" : ""
                    }`}
                >
                    {children} 
                </main> 
            </div> 
        </div> 
    ); 
}; 
 
export default MainLayout;
