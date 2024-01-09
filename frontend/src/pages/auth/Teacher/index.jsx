/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Drawer, Typography, Button, Input } from "@material-tailwind/react";
import "react-toastify/dist/ReactToastify.css";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { ToastContainer, toast } from "react-toastify";
import { auth } from "../../../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { IoArrowBack } from "react-icons/io5";

const TeacherDrawer = ({ open, onClose }) => {
  const [showAuth, setShowAuth] = useState(true);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    // subjects: [],
  });
  // const animatedComponents = makeAnimated();
  // const options = [
  //   { value: "Advanced Java", label: "Advanced Java" },
  //   { value: "Data Warehouse", label: "Data Warehouse" },
  //   { value: "PoM", label: "PoM" },
  //   { value: "Project Work", label: "Project Work" },
  //   { value: "Information Retrieval", label: "Information Retrieval" },
  //   { value: "Database Administration", label: "Database Administration" },
  //   {
  //     value: "Software Project Management",
  //     label: "Software Project Management",
  //   },
  //   { value: "Network Security", label: "Network Security" },
  //   { value: "Digital System Design", label: "Digital System Design" },
  //   {
  //     value: "Network and System Administration",
  //     label: "Network and System Administration",
  //   },
  //   { value: "International Marketing", label: "International Marketing" },
  // ];
  // const customStyles = {
  //   control: (provided, state) => ({
  //     ...provided,
  //     marginTop: "10px",
  //     cursor: "pointer",
  //     minHeight: "40px",
  //     fontSize: "15px",
  //     fontFamily: "Roboto, sans-serif",
  //     border: "none",
  //     borderBottom: state.isFocused ? "2px solid #00bcd4" : "1px solid #ccc",
  //     boxShadow: "none",
  //     "&:hover": {
  //       borderBottom: state.isFocused ? "2px solid #00bcd4" : "1px solid #ccc",
  //     },
  //   }),
  //   input: (provided) => ({
  //     ...provided,
  //     height: "36px",
  //     margin: 0,
  //   }),
  // };
  // const handleSubjectChange = (selectedOptions) => {
  //   setFormData({
  //     ...formData,
  //     subjects: selectedOptions.map((option) => option.value),
  //   });
  //   setErrors({
  //     ...errors,
  //     subjects: "",
  //   });
  // };

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
    setLoadingLogin(true);

    const validationErrors = {};
    if (!formData.email) {
      validationErrors.email = "Email is required";
    }
    if (!formData.password) {
      validationErrors.password = "Password is required";
    }
    // if (formData.subjects.length === 0) {
    //   validationErrors.subjects = "At least one subject is required";
    // }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoadingLogin(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
    } catch (error) {
      toast.error(error.message);
      resetForm();
    } finally {
      setLoadingLogin(false);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoadingRegister(true);
    const validationErrors = {};
    if (!formData.email) {
      validationErrors.email = "Email is required";
    }
    if (!formData.password) {
      validationErrors.password = "Password is required";
    }
    // if (formData.subjects.length === 0) {
    //   validationErrors.subjects = "At least one subject is required";
    // }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoadingRegister(false);

      return;
    }

    try {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
        // formData.subjects
      );
      toast.success("Teacher registered successfully");
    } catch (error) {
      toast.error(error.message);
      resetForm();
    } finally {
      setLoadingRegister(false);
    }
  };
  const handleChangeUI = () => {
    setShowAuth(false);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoadingReset(true);
    const emailVal = e.target.email.value;

    try {
      await sendPasswordResetEmail(auth, emailVal);
      toast.success(
        "Password reset email sent successfully. Please check your email"
      );
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoadingReset(false);
    }
  };

  return (
    <>
      <Drawer
        open={open}
        onClose={onClose}
        className="p-4 shadow-lg bg-transparent"
        placement="right"
        size="450px"
      >
        <ToastContainer className="z-50" position="top-left" />
        {showAuth ? (
          <div className="bg-white p-4">
            <div className="mb-6 flex items-center justify-between">
              <Typography
                variant="h5"
                color="purple"
                className="text-center w-full "
              >
                Login / <span className="text-orange-500">Registration</span>
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
                {/* <Select
                  components={animatedComponents}
                  isMulti
                  options={options}
                  placeholder="Choose your subject"
                  styles={customStyles}
                  onChange={handleSubjectChange}
                  error={errors.subjects}
                  value={options.filter(
                    (option) =>
                      formData.subjects &&
                      formData.subjects.includes(option.value)
                  )}
                />
                {errors.subjects && (
                  <Typography variant="caption" color="red">
                    {errors.subjects}
                  </Typography>
                )} */}
              </div>
              <Button
                className="mt-6"
                color="purple"
                size="lg"
                fullWidth
                onClick={handleLogin}
                disabled={loadingLogin || loadingRegister}
              >
                {loadingLogin ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-orange-600"></div>
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
              <Button
                className="mt-6"
                color="orange"
                size="lg"
                fullWidth
                disabled={loadingRegister || loadingLogin}
                onClick={handleRegister}
              >
                {loadingRegister ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-purple-600"></div>
                  </div>
                ) : (
                  "Register"
                )}
              </Button>
              <Button
                onClick={handleChangeUI}
                className="mt-6"
                size="lg"
                fullWidth
              >
                Forgot Password
              </Button>
            </form>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              handleForgotPassword(e);
            }}
          >
            <div className="bg-white p-4">
              <div className="mb-6 flex items-center justify-between">
                <Typography
                  variant="h5"
                  color="purple"
                  className="text-center w-full flex justify-between "
                >
                  <IoArrowBack
                    className="text-3xl cursor-pointer text-black"
                    onClick={() => setShowAuth(true)}
                  />
                  <span className="text-black">Forgot Password</span>
                  <div />
                </Typography>
                <IoCloseOutline
                  onClick={onClose}
                  className="text-2xl cursor-pointer"
                />
              </div>
              <div className="mb-1 flex flex-col gap-6">
                <Input
                  variant="standard"
                  type="email"
                  label="Email"
                  name="email"
                />

                <Button
                  type="submit"
                  className="mt-6"
                  size="lg"
                  fullWidth
                  disabled={loadingReset}
                >
                  {loadingReset ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white-600"></div>
                    </div>
                  ) : (
                    "Reset"
                  )}
                </Button>
              </div>
            </div>
          </form>
        )}
      </Drawer>
    </>
  );
};

export default TeacherDrawer;