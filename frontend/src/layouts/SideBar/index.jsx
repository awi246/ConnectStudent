/* eslint-disable no-unused-vars */
import  { useState } from "react";
import "../../styles/Sidebar.css";
import SidebarOptions from "./sidebarOptions";

function Sidebar() {
  const [selectedOption, setSelectedOption] = useState("Advance Java");

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="sidebar">
      <SidebarOptions onSelectOption={handleSelectOption} />
      
    </div>
  );
}

export default Sidebar;
