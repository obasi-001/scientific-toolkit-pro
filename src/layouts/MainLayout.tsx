import { useState, type ReactNode } from "react";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((previous) => !previous);
  };

  return (
    <div className="app">
      <Navbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={handleToggleSidebar}
      />

      <div className="main-layout">
        <Sidebar isOpen={isSidebarOpen} />

        <main className="dashboard">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;