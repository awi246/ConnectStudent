import { useState } from "react";
import "./Login.css";
import { motion } from "framer-motion";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { Button } from "@material-tailwind/react";
import logo from "../../assets/newLogo.svg";
import TeacherDrawer from "./Teacher";
function Login() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  document.title = "Connect Students";
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

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
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
            <p className="text-2xl mb-2 font-medium">
              Note: Student can directly login without registration
            </p>
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
              className="btn-login bg-[#FF3131] hover:bg-green-400 capitalize"
              size="lg"
            >
              STUDENT LOGIN
            </Button>
            <Button
              onClick={openDrawer}
              className="btn-login bg-[#69418B] hover:bg-green-400 capitalize"
              size="lg"
            >
              TEACHER LOGIN/REGISTRATION
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {drawerOpen && <TeacherDrawer open={drawerOpen} onClose={closeDrawer} />}
    </div>
  );
}

export default Login;
