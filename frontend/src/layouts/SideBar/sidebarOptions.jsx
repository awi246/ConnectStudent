/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import "../../styles/SidebarOptions.css";
import image from "../../assets/image.jpeg";
import { Button, Input } from "@material-tailwind/react";
import Modal from "react-responsive-modal";
import { IoCloseOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SidebarOptions({ onSelectOption }) {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [subjectModal, setSubjectModal] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState("");

  const Close = <IoCloseOutline />;

  useEffect(() => {
    // Fetch subjects from your API
    const fetchSubjects = async () => {
      try {
        const response = await fetch("http://localhost:90/api/subjects");
        const data = await response.json();
        setOptions(data.data);
        // Set the default selected option if needed
        if (data.data.length > 0) {
          setSelectedOption(data.data[0].name);
          onSelectOption(data.data[0].name);
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelectOption(option);
  };

  const handleAddSubject = async () => {
    try {
      const response = await fetch("http://localhost:90/api/subjects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newSubjectName }),
      });

      if (response.ok) {
        const newSubjectData = await response.json();
        setOptions((prevOptions) => [...prevOptions, newSubjectData.data]);
        setSubjectModal(false);
        setSelectedOption(newSubjectData.data.name);
        onSelectOption(newSubjectData.data.name);
        toast.success("Subject added successfully");
      } else {
        toast.error("Failed to add subject");
      }
    } catch (error) {
      toast.error("Error adding subject");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        {options.map((option) => (
          <div
            key={option.id}
            className={`sidebarOption ${
              selectedOption === option.name ? "selected" : ""
            }`}
            onClick={() => handleOptionClick(option.name)}
          >
            <img src={image} alt="" />
            <p>{option.name}</p>
          </div>
        ))}
        <div className="sidebarOption" onClick={() => setSubjectModal(true)}>
          <IoMdAdd />
          <p className="text" >
            Add more Subjects
          </p>
        </div>
      </div>
      <Modal
        open={subjectModal}
        closeIcon={Close}
        classNames={{
          modal: "logoutModal",
          overlayAnimationIn: "customEnterOverlayAnimation",
          overlayAnimationOut: "customLeaveOverlayAnimation",
          modalAnimationIn: "customEnterModalAnimation",
          modalAnimationOut: "customLeaveModalAnimation",
        }}
        animationDuration={400}
        onClose={() => setSubjectModal(false)}
        closeOnEsc
        center
        closeOnOverlayClick={false}
        styles={{
          overlay: {
            height: "auto",
          },
        }}
      >
        <div className="flex flex-col gap-8 justify-center items-center mt-4">
          <Input
            label="Name of the Subject"
            value={newSubjectName}
            onChange={(e) => setNewSubjectName(e.target.value)}
          />
          <div className="flex gap-10">
            <Button size="lg" color="green" onClick={handleAddSubject}>
              Confirm
            </Button>
            <Button
              size="lg"
              color="red"
              onClick={() => setSubjectModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
     
    </>
  );
}

export default SidebarOptions;
