/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "../../styles/SidebarOptions.css";
import image from "../../assets/image.jpeg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SidebarOptions({ onSelectOption }) {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch("http://localhost:90/api/notes");
        const data = await response.json();
        setOptions(data?.data);

        if (data.length > 0) {
          setSelectedOption(data[0].name);
          onSelectOption(data[0].name);
        }
      } catch (error) {
        toast.error("Error fetching subjects");
      }
    };

    fetchSubjects();
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option.name);
    onSelectOption(option.name);
    document.title = `Connect Students | ${option.name}`;
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col gap-3">
        {options.map((option, index) => (
          <div
            key={index}
            className={`sidebarOption ${
              selectedOption === option.name ? "selected" : ""
            }`}
            onClick={() => handleOptionClick(option)}
          >
            <img src={image} alt="" />
            <p>{option.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default SidebarOptions;
