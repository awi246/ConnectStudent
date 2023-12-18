/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Drawer, Typography, Button, Input } from "@material-tailwind/react";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TeacherLoginDrawer = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
    });

    setErrors({
      email: "",
      password: "",
    });
  };

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

  const handleLogin = async (event) => {
    event.preventDefault();

    const validationErrors = {};
    if (!formData.email) {
      validationErrors.email = "Email is required";
    }
    if (!formData.password) {
      validationErrors.password = "Password is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:90/api/teacherLogin",
        formData
      );

      toast.success(response.data.message);
      resetForm();
      onClose();
    } catch (error) {
      toast.error(error.response.data.error);
      resetForm();
      onClose();
    }
  };

  return (
    <>
      <ToastContainer />
      <Drawer
        open={open}
        onClose={onClose}
        className="p-4 shadow-lg bg-transparent"
        placement="left"
        size="450px"
      >
        <div className="bg-white p-4">
          <div className="mb-6 flex items-center justify-between">
            <Typography
              variant="h5"
              color="purple"
              className="text-center w-full "
            >
              Teacher Login
            </Typography>
            <IoCloseOutline
              onClick={onClose}
              className="text-2xl cursor-pointer"
            />
          </div>

          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleLogin}
          >
            <div className="mb-1 flex flex-col gap-6">
              <Input
                variant="standard"
                type="email"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
              />
              {errors.email && (
                <Typography variant="caption" color="red">
                  {errors.email}
                </Typography>
              )}

              <Input
                variant="standard"
                type="password"
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
              />
              {errors.password && (
                <Typography variant="caption" color="red">
                  {errors.password}
                </Typography>
              )}
            </div>
            <Button
              className="mt-6"
              color="purple"
              size="lg"
              fullWidth
              type="submit"
            >
              Login
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              {"Don't have an account? "}{" "}
              <a href="#" className="font-medium text-gray-900">
                Register Now
              </a>
            </Typography>
          </form>
        </div>
      </Drawer>
    </>
  );
};

export default TeacherLoginDrawer;
