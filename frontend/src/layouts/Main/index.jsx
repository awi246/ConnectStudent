/* eslint-disable react/prop-types */
import { useState } from "react";
import "../../styles/Sidebar.css";
import SidebarOptions from "../SideBar/sidebarOptions";
import Feed from "../../components/UI/Feed/feed";
import Header from "../../components/UI/Header/header";
// import Widget from "../RightSide";
import Image from "../../assets/bgMain.svg";
const Main = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };
  const mainStyle = {
    backgroundImage: `url(${Image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="w-full">
      <Header />
      <div className="min-h-screen p-12" style={mainStyle}>
        <div className="flex flex-row gap-[500px]">
          <div className="w-20">
            <div className="fixed bg-white p-4 shadow-2xl rounded-lg">
              <Sidebar onSelectOption={handleSelectOption} />
            </div>
          </div>
          <Feed selectedOption={selectedOption} />
        </div>
      </div>
    </div>
  );
};

function Sidebar({ onSelectOption }) {
  return (
    <div className="sidebar">
      <SidebarOptions onSelectOption={onSelectOption} />
    </div>
  );
}

export default Main;
