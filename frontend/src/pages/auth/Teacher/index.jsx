/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Drawer, Typography, Button, Input } from "@material-tailwind/react";
import "react-toastify/dist/ReactToastify.css";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { ToastContainer, toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { auth } from "../../../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { IoArrowBack } from "react-icons/io5";
import Logo from "../../../assets/newLogo.svg";
const TeacherDrawer = ({ open, onClose }) => {
  const [showAuth, setShowAuth] = useState("login");
  const [showLoginPassword, setShowLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
    });

    setErrors({
      email: "",
      password: "",
      confirmPassword: "",
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
    if (!formData.confirmPassword) {
      validationErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Ops! Passwords didn't match";
    }

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
      );
      toast.success("Teacher registered successfully");
    } catch (error) {
      toast.error(error.message);
      resetForm();
    } finally {
      setLoadingRegister(false);
    }
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

  const handleChangeUI = (ui) => {
    setShowAuth(ui);
    resetForm();
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
        {showAuth === "login" && (
          <div className="bg-white p-4">
            <div className="flex items-center justify-between">
              <Typography
                variant="h5"
                color="purple"
                className="text-center w-full flex items-center justify-center gap-4"
              >
                <span className="text-2xl">Login</span>
                <img src={Logo} />
              </Typography>
              <IoCloseOutline
                onClick={onClose}
                className="text-2xl cursor-pointer"
              />
            </div>

            <form
              className="mb-2 w-80 max-w-screen-lg sm:w-96"
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
                <div className="relative">
                  <Input
                    variant="standard"
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    error={errors.password}
                  />
                  {showLoginPassword ? (
                    <FiEye
                      className="absolute right-4 bottom-2 rounded text-xl text-purple-400 cursor-pointer"
                      onClick={() => setShowLoginPassword(false)}
                    />
                  ) : (
                    <FiEyeOff
                      color="gray"
                      className="absolute right-4 bottom-2  rounded text-xl cursor-pointer"
                      onClick={() => setShowLoginPassword(true)}
                    />
                  )}
                </div>
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
                onClick={() => handleChangeUI("register")}
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
                onClick={() => handleChangeUI("reset")}
                className="mt-6"
                size="lg"
                fullWidth
              >
                Forgot Password
              </Button>
            </form>
          </div>
        )}
        {showAuth === "register" && (
          <form
            onSubmit={(e) => {
              handleRegister(e);
            }}
            className="bg-white p-4 mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          >
            <div className="mb-6 flex items-center justify-between">
              <Typography
                variant="h5"
                color="purple"
                className="text-center w-full flex justify-between items-center"
              >
                <IoArrowBack
                  className="text-3xl cursor-pointer text-black"
                  onClick={() => handleChangeUI("login")}
                />

                <span className="text-orange-500 ml-4">Register</span>
                <img src={Logo} className="-ml-7" />

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
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
              />
              {errors.email && (
                <Typography variant="caption" color="red">
                  {errors.email}
                </Typography>
              )}
              <div className="relative">
                <Input
                  variant="standard"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={errors.password}
                />
                {showPassword ? (
                  <FiEye
                    className="absolute right-4 bottom-2 rounded text-xl text-purple-400 cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FiEyeOff
                    color="gray"
                    className="absolute right-4 bottom-2  rounded text-xl cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
              {errors.password && (
                <Typography variant="caption" color="red">
                  {errors.password}
                </Typography>
              )}
              <div className="relative">
                <Input
                  variant="standard"
                  type={showConfirmPassword ? "text" : "password"}
                  label="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={errors.confirmPassword}
                />
                {showConfirmPassword ? (
                  <FiEye
                    className="absolute right-4 bottom-4 rounded text-xl text-purple-400 cursor-pointer"
                    onClick={() => setShowConfirmPassword(false)}
                  />
                ) : (
                  <FiEyeOff
                    color="gray"
                    className="absolute right-4 bottom-2  rounded text-xl cursor-pointer"
                    onClick={() => setShowConfirmPassword(true)}
                  />
                )}
              </div>
              {errors.confirmPassword && (
                <Typography variant="caption" color="red">
                  {errors.confirmPassword}
                </Typography>
              )}
            </div>
            <Button
              type="submit"
              className="mt-6"
              size="lg"
              color="orange"
              fullWidth
              disabled={loadingRegister}
            >
              {loadingRegister ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-purple-600"></div>
                </div>
              ) : (
                "Register"
              )}
            </Button>
          </form>
        )}
        {showAuth === "reset" && (
          <form
            onSubmit={(e) => {
              handleForgotPassword(e);
            }}
            className="bg-white p-4 mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          >
            <div className="mb-6 flex items-center justify-between">
              <Typography
                variant="h5"
                color="purple"
                className="text-center w-full flex justify-between items-center"
              >
                <IoArrowBack
                  className="text-3xl cursor-pointer text-black"
                  onClick={() => handleChangeUI("login")}
                />
                <span className="text-black ml-4">Forgot Password</span>
                <img src={Logo} />
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
          </form>
        )}
      </Drawer>
    </>
  );
};

export default TeacherDrawer;
