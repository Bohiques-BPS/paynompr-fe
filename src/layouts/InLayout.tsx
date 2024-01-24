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
    if (window.innerWidth < 700) {
      if (sidebarOpen === "true") setSidebarOpen("false");
      else setSidebarOpen("true");
    }
  };

  const toggleSidebarOption = () => {
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
          <Header toggleSidebar={toggleSidebar} />
          {/* <!-- ===== Header End ===== --> */}
          <div className="flex">
            {/* <!-- ===== Sidebar Start ===== --> */}
            <Sidebar
              sidebarOpen={sidebarOpen}
              toggleSidebar={toggleSidebar}
              toggleSidebarOption={toggleSidebarOption}
            />
            {/* <!-- ===== Sidebar End ===== --> */}

            {/* <!-- ===== Main Content Start ===== --> */}

            <div
              className={` transition-all duration-500 w-full mt-[88px] relative   xl:mt-[8vh]     bg-[#E1E1E1] overflow-auto h-[calc(100vh-8vh)]  ${
                sidebarOpen === "true"
                  ? "  md:ms-[25%] md:w-3/4 "
                  : " md:ms-[8.333333%] md:w-11/12 "
              } `}
            >
              <div className="container  mx-auto p-4  md:p-10 min-h-[calc(100vh-14vh)] ">
                <Outlet />
              </div>
              <Footer sidebarOpen={sidebarOpen} />
            </div>
          </div>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>

        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default InLayout;
