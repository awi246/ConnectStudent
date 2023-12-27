/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import "../../styles/Sidebar.css";
import SidebarOptions from "../../layouts/SideBar/sidebarOptionsNotes";
import Image from "../../assets/soon.gif";
import Footer from "../../components/Footer/footer";
const Notes = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectOption = (option) => {
    document.title = `Connect Students | ${
      option.name ? option.name : "Notes Section"
    }`;
    setSelectedOption(option);
  };
  const mainStyle = {
    backgroundImage: `url(${Image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  if (!selectedOption) {
    document.title = "Connect Students | Notes Section";
  }

  return (
    <>
      <div className="w-full">
        <div className="min-h-screen p-12" style={mainStyle}>
          <div className="flex flex-row justify-between">
            <div className="w-40">
              <div className="fixed bg-white p-4 shadow-2xl rounded-lg overflow-auto max-h-[600px] sidebar_scrollbar">
                <Sidebar onSelectOption={handleSelectOption} />
              </div>
            </div>
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

export default Notes;
