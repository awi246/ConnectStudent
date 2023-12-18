/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Drawer, Typography, Button, Input } from "@material-tailwind/react";
import { IoCloseOutline } from "react-icons/io5";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TeacherRegistrationDrawer = ({ open, onClose }) => {
  const animatedComponents = makeAnimated();
  const options = [
    { value: "Advanced Java", label: "Advanced Java" },
    { value: "Data Warehouse", label: "Data Warehouse" },
    { value: "PoM", label: "PoM" },
    { value: "Project Work", label: "Project Work" },
    { value: "Information Retrieval", label: "Information Retrieval" },
    { value: "Database Administration", label: "Database Administration" },
    {
      value: "Software Project Management",
      label: "Software Project Management",
    },
    { value: "Network Security", label: "Network Security" },
    { value: "Digital System Design", label: "Digital System Design" },
    {
      value: "Network and System Administration",
      label: "Network and System Administration",
    },
    { value: "International Marketing", label: "International Marketing" },
  ];
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      marginTop: "10px",
      cursor: "pointer",
      minHeight: "40px",
      fontSize: "15px",
      fontFamily: "Roboto, sans-serif",
      border: "none",
      borderBottom: state.isFocused ? "2px solid #00bcd4" : "1px solid #ccc",
      boxShadow: "none",
      "&:hover": {
        borderBottom: state.isFocused ? "2px solid #00bcd4" : "1px solid #ccc",
      },
    }),
    input: (provided) => ({
      ...provided,
      height: "36px",
      margin: 0,
    }),
  };
  const resetForm = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      subjects: "",
    });

    setErrors({
      username: "",
      email: "",
      password: "",
      subjects: "",
    });
  };

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    subjects: [],
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    subjects: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubjectChange = (selectedOptions) => {
    setFormData({
      ...formData,
      subjects: selectedOptions.map((option) => option.value),
    });
    setErrors({
      ...errors,
      subjects: "",
    });
  };

  const handleRegistration = async (event) => {
    event.preventDefault();

    const validationErrors = {};
    if (!formData.username) {
      validationErrors.username = "Username is required";
    }
    if (!formData.email) {
      validationErrors.email = "Email is required";
    }
    if (!formData.password) {
      validationErrors.password = "Password is required";
    }
    if (formData.subjects.length === 0) {
      validationErrors.subjects = "At least one subject must be selected";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:90/api/teacherRegisters",
        formData
      );

      toast.success(response.data.message);
      resetForm();

      onClose();
    } catch (error) {
      toast.error(error.response.data.error);
      onClose();
      resetForm();
    }
  };

  return (
    <>
      <ToastContainer />
      <Drawer
        open={open}
        onClose={onClose}
        className="p-4 shadow-lg bg-transparent"
        placement="right"
        size="450px"
      >
        <div className="bg-white p-4">
          <div className="mb-6 flex items-center justify-between">
            <Typography
              variant="h5"
              color="orange"
              className="text-center w-full "
            >
              Teacher Registration
            </Typography>
            <IoCloseOutline
              onClick={onClose}
              className="text-2xl cursor-pointer"
            />
          </div>

          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleRegistration}
          >
            <div className="mb-1 flex flex-col gap-6">
              <Input
                variant="standard"
                type="text"
                label="Full Name"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                error={errors.username}
              />
              <Input
                variant="standard"
                type="email"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
              />
              <Input
                variant="standard"
                type="password"
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
              />
              <Select
                components={animatedComponents}
                isMulti
                options={options}
                placeholder="Choose your subject"
                styles={customStyles}
                onChange={handleSubjectChange}
                error={errors.subjects}
                value={options.filter((option) =>
                  formData.subjects.includes(option.value)
                )}
              />
            </div>
            <Button
              className="mt-6"
              color="orange"
              size="lg"
              fullWidth
              type="submit"
            >
              Register
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <a href="#" className="font-medium text-gray-900">
                Log In
              </a>
            </Typography>
          </form>
        </div>
      </Drawer>
    </>
  );
};

export default TeacherRegistrationDrawer;
