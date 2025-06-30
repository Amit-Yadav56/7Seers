import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-[70vw]">
        {/* Header */}
        <Header
          currentPage={currentPage}
          onToggleSidebar={toggleSidebar}
          onSearch={handleSearch}
        />

        {/* Page Content */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            {searchQuery && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">
                  Search Results
                </h3>
                <p className="text-blue-700">
                  Currently searching for:{" "}
                  <span className="font-medium">"{searchQuery}"</span>
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  This is where your search results would appear in a real
                  application.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
