/* eslint-disable react/prop-types */
import { useState } from 'react';
import '../../styles/Sidebar.css';
import SidebarOptions from '../SideBar/sidebarOptions';
import Feed from '../../components/UI/Feed/feed';
import Header from '../../components/UI/Header/header';
import Widget from '../RightSide';

const Main = () => {
  const [selectedOption, setSelectedOption] = useState('Advance Java');

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="w-full">
      <Header />
      <div className="bg-gray-100 min-h-screen p-12">
        <div className="flex flex-row justify-between">
          <div className="w-40">
            <div className="fixed bg-white p-4 shadow-2xl rounded-lg">
              <Sidebar onSelectOption={handleSelectOption} />
            </div>
          </div>
          <Feed selectedOption={selectedOption} />
          <Widget />
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
