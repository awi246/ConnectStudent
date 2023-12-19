/* eslint-disable react/prop-types */
import { useState } from "react";
import "../../styles/Sidebar.css";
import SidebarOptions from "../SideBar/sidebarOptions";
import Feed from "../../components/UI/Feed/feed";
import Header from "../../components/UI/Header/header";
import Widget from "../RightSide";
import Image from "../../assets/bgMain.svg";
import Footer from "../../components/Footer/footer";
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
    <>
      <div className="w-full">
        <Header />
        <div className="min-h-screen p-12" style={mainStyle}>
          <div className="flex flex-row justify-between">
            <div className="w-40">
              <div className="fixed bg-white p-4 shadow-2xl rounded-lg overflow-auto max-h-[600px] sidebar_scrollbar">
                <Sidebar onSelectOption={handleSelectOption} />
              </div>
            </div>
            <Feed selectedOption={selectedOption} />
            <Widget />
          </div>
        </div>
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </>
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
