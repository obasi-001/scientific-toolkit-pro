import { useEffect, useState, type ReactNode } from "react"; 
import Navbar from "../components/navbar/Navbar"; 
import Sidebar from "../components/sidebar/Sidebar"; 
 
interface MainLayoutProps { 
    children: ReactNode; 
} 
 
const MainLayout = ({ children }: MainLayoutProps) => { 
    const [isSidebarOpen, setIsSidebarOpen] = useState(() => { 
        return window.innerWidth >= 992; 
    }); 


    useEffect(() => { 
        const isMobile = window.innerWidth < 992; 

        if (isMobile && isSidebarOpen) { 
            document.body.style.overflow = "hidden"; 
        } else { 
            document.body.style.overflow = ""; 
        } 

        return () => { 
            document.body.style.overflow = ""; 
        }; 
    }, [isSidebarOpen]); 
 
 
    const handleToggleSidebar = () => { 
        setIsSidebarOpen((previous) => !previous); 
    }; 
 
 
    const handleCloseSidebar = () => { 
        setIsSidebarOpen(false); 
    }; 
 
 
    return ( 
        <div className="app"> 
            <Navbar 
                isSidebarOpen={isSidebarOpen} 
                onToggleSidebar={handleToggleSidebar} 
            /> 
 
            <div className="main-layout"> 
                <Sidebar 
                    isOpen={isSidebarOpen} 
                    onClose={handleCloseSidebar} 
                /> 
 
                <main className="dashboard"> 
                    {children} 
                </main> 
            </div> 
        </div> 
    ); 
}; 
 
export default MainLayout;