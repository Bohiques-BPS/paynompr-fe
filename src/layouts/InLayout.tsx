import { useEffect, useState } from "react";
import Header from "../components/nav/Header";
import Sidebar from "../components/nav/Sidebar";
import { Outlet } from "react-router-dom";
import Footer from "../components/nav/Footer";
import { useLocalStorage } from "../utils/UseLocalStorage";

const InLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useLocalStorage(
    "sidebar-expanded",
    "false"
  );

  const toggleSidebar = () => {
    if (sidebarOpen === "true") setSidebarOpen("false");
    else setSidebarOpen("true");
  };

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className=" min-h-screen overflow-hidden">
        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header />
          {/* <!-- ===== Header End ===== --> */}
          <div className="flex">
            {/* <!-- ===== Sidebar Start ===== --> */}
            <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            {/* <!-- ===== Sidebar End ===== --> */}

            {/* <!-- ===== Main Content Start ===== --> */}

            <div
              className={` transition-all duration-300 max-w-screen-2xl p-4 md:p-6 2xl:p-10 bg-[#E1E1E1] min-h-[calc(100vh-14vh)] ${
                sidebarOpen === "true" ? " w-3/4" : "w-11/12"
              } `}
            >
              <Outlet />
            </div>
          </div>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        <Footer />
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default InLayout;
