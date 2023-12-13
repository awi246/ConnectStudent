import "./Login.css";
import { motion } from "framer-motion";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { Button } from "@material-tailwind/react";
import logo from "../../assets/Mainlogo.png";
function Login() {
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
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
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
          <motion.div
            initial={{ opacity: 0, y: 50 }}
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
              LOGIN WITH GOOGLE
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Login;
