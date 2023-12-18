import  { useState } from "react";
import "./Login.css";
import { motion } from "framer-motion";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { Button } from "@material-tailwind/react";
import logo from "../../assets/newLogo.svg";
import TeacherRegistrationDrawer from "./Teacher/register";
import TeacherLoginDrawer from "./Teacher/login";
function Login() {
  const [registerDrawerOpen, setRegisterDrawerOpen] = useState(false);
  const [LoginDrawerOpen, setLoginDrawerOpen] = useState(false);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 200 },
    },
  };

  const handleSubmit = async () => {
    await signInWithPopup(auth, provider)
      .then(() => {
        // console.log(result);
      })
      .catch(() => {
        // console.log(error);
      });
  };

  const openRegisterDrawer = () => {
    setRegisterDrawerOpen(true);
  };

  const closeRegisterDrawer = () => {
    setRegisterDrawerOpen(false);
  };
  const openLoginDrawer = () => {
    setLoginDrawerOpen(true);
  };

  const closeLoginDrawer = () => {
    setLoginDrawerOpen(false);
  };

  return (
    <div className="login-container">
      <motion.div
        className="flex items-center justify-center min-h-screen"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="flex items-center flex-col"
          variants={itemVariants}
        >
          <div className="flex">
            <motion.img
              src="https://video-public.canva.com/VAD8lt3jPyI/v/ec7205f25c.gif"
              alt="logo"
              initial={{ opacity: 0, scale: 0.5 }}
              className="object-contain"
              width={200}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { type: "spring", stiffness: 200 },
              }}
            />
            <img src={logo} className="" width={380} />
          </div>
          <div>
              <p className="text-2xl mb-2">Note: Student can directly login without registration</p>
            </div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            className="flex flex-row gap-6"
            animate={{
              opacity: 1,
              y: 0,
              transition: { type: "spring", stiffness: 300 },
            }}
          >
            <Button
              onClick={handleSubmit}
              color="red"
              className="btn-login hover:bg-green-400 capitalize"
              size="lg"
            >
              STUDENT LOGIN
            </Button>
            <Button
              onClick={openLoginDrawer}
              color="purple"
              className="btn-login hover:bg-green-400 capitalize"
              size="lg"
            >
              TEACHER LOGIN
            </Button>
            <Button
              onClick={openRegisterDrawer}
              color="orange"
              className="btn-login hover:bg-green-400 capitalize"
              size="lg"
            >
              TEACHER REGISTRATION
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
          
      <TeacherRegistrationDrawer open={registerDrawerOpen} onClose={closeRegisterDrawer} />
      { LoginDrawerOpen &&
      <TeacherLoginDrawer open={LoginDrawerOpen} onClose={closeLoginDrawer} />
      }
    </div>
  );
}

export default Login;
