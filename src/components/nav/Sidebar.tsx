import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

interface SidebarProps {
  sidebarOpen: string;
  toggleSidebar: () => void;
}

const Sidebar = ({ sidebarOpen, toggleSidebar }: SidebarProps) => {
  return (
    <div
      className={` transition-all  duration-300  bg-[#645c9f] h-[calc(100vh-14vh)] ${
        sidebarOpen === "true" ? "w-1/4" : "w-1/12"
      }`}
      onClick={toggleSidebar}
    ></div>
  );
};

export default Sidebar;
