import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Settings from "./Settings";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("settings");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handlePageChange = (pageId) => {
    setCurrentPage(pageId);
    console.log(`Navigated to: ${pageId}`);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log(`Searching for: ${query}`);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-[70vw] p-6">
        {/* Header */}
        <Header
          currentPage={currentPage}
          onToggleSidebar={toggleSidebar}
          onSearch={handleSearch}
        />

        {/* Page Content */}
        <div className="flex-1">
          <Settings />
        </div>
      </div>
    </div>
  );
}

export default App;
