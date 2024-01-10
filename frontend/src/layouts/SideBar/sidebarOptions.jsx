/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "../../styles/SidebarOptions.css";
import image from "../../assets/image.jpeg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@material-tailwind/react";

function SidebarOptions({ onSelectOption }) {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch("http://localhost:90/api/subjects");
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
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSelectedOption(option.name);
    onSelectOption(option.name);
    document.title = `Connect Students | ${option.name}`;
  };
  const handleMyPostsClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSelectedOption("myPosts");
    onSelectOption("myPosts");
    document.title = "Connect Students | My Posts";
  };

  return (
    <>
      <ToastContainer />
      <Button
        onClick={handleMyPostsClick}
        size="lg"
        className={`sidebarOption ${
          selectedOption === "myPosts"
            ? "selected h-12 w-full ml-2 mb-2"
            : "ml-2 h-12 w-full mb-2 bg-[#94C4FC]"
        }`}
      >
        View my Posts
      </Button>
      <hr />
      <div className="my-3">
        <span className="ml-6 text-xl font-semibold text-[#69418B]">
          Subjects
        </span>
      </div>
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
