/* eslint-disable no-unused-vars */
//inbuild library
import { useEffect, useState } from "react";

//thirdparty library
import axios from "axios";

// import { RxAvatar } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { SlLogout } from "react-icons/sl";
import { Modal } from "react-responsive-modal";
import logo from "../../../assets/newLogo.svg";
import alternateImg from "../../../assets/brokeImg.png";

//styles
import "../../../styles/Header.css";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../../feature/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import SearchBar from "../../SearchBar";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const Close = <IoCloseOutline className="text-2xl" />
  const [subjects, setSubjects] = useState([]);
  const [scrolling, setScrolling] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const resetForm = () => {
    setQuestion("");
    setSelectedSubject("");
    setImagePreview(null);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Invalid file type. Please upload an image.");
        e.target.value = "";
        setImageFile(null);
        setImagePreview(null);
        return;
      }

      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("http://localhost:90/api/subjects");
        setSubjects(response.data.data);
      } catch (error) {
        // console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  const handleSubmit = async () => {
    if (!question.trim() || !selectedSubject) {
      toast.error("Please fill in all required fields");
      setTimeout(() => {
        toast.dismiss();
      }, 3250);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = {
      questionName: question,
      questionUrl: inputUrl,
      questionSubject: selectedSubject,
      userType: user?.type,
      userPhoto: user?.photo,
      uid: user?.uid,
      postedBy: user?.userName,
      createdAt: new Date().toLocaleString("ne-NP", {
        timeZone: "Asia/Kathmandu",
      }),
    };

    try {
      const response = await axios.post(
        "http://localhost:90/api/questions",
        body,
        config
      );

      setIsModalOpen(false);
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (error) {
      setIsModalOpen(false);
      toast.error(error?.response?.data?.message || "Failed to add question");
    }
  };

  const openLogoutModal = () => {
    setLogoutModal(true);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(logout());
        // console.log( "Logged out" );
      })
      .catch(() => {
        toast.error("Something went wrong.Please try again");
      });
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <div
        className={`Header ${scrolling ? "bg-gray-100" : ""} ${
          scrolling ? "" : "shadow-xl"
        }`}
      >
        <div className="flex flex-row items-center gap-16">
          <a href="/">
            <img src={logo} alt="logo" width={150} className="mt-6" />
          </a>
          <SearchBar />
          <div className="flex flex-row items-center justify-end gap-6">
            <Button
              color="blue"
              className="hover:bg-green-300"
              onClick={() => setIsModalOpen(true)}
            >
              Add Question
            </Button>
            <SlLogout
              onClick={openLogoutModal}
              src={user?.photo}
              size={25}
              className="cursor-pointer hover:text-red-300"
            />
          </div>
          <Modal
            open={isModalOpen}
            closeIcon={Close}
            classNames={{
              modal: "addQuestionModal",
              modalAnimationIn: "customEnterModalAnimation",
              modalAnimationOut: "customLeaveModalAnimation",
            }}
            animationDuration={800}
            onClose={() => setIsModalOpen(false)}
            center
            closeOnOverlayClick={false}
            styles={{
              overlay: {
                height: "auto",
              },
            }}
          >
            <div className="p-5">
              <div className="text-right mb-2">
                <label htmlFor="subjects" className="font-medium mr-2">
                  Subject<span className="text-red-500">*</span>:
                </label>
                <select
                  id="subjects"
                  value={selectedSubject}
                  className="border p-2 rounded-md"
                  onChange={(e) => setSelectedSubject(e.target.value)}
                >
                  <option value="">Please assign subject</option>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.name}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>

              <label htmlFor="imageUpload" className="font-medium ">
                Question<span className="required text-red-500">*</span>:
              </label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                type=" text"
                className="p-3 whitespace-pre-wrap mt-4 shadow-lg border rounded-md w-full h-auto resize-none "
                placeholder="Start your question with 'What', 'How', 'Why', etc. "
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label htmlFor="imageUpload" className="font-medium mt-4">
                  Upload Question Photo(optional):
                </label>
                <input
                  type="file"
                  accept="image"
                  name="imageUpload"
                  onChange={handleImageChange}
                  className="p-3 mb-2 mt-4 shadow-lg border rounded-md w-full"
                  placeholder="Optional: Include a link that gives context or the image"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Image Preview"
                    className="mt-2 rounded-md shadow-lg"
                    style={{ maxWidth: "100%" }}
                  />
                )}
              </div>
              <p className="text-red-500 text-sm">
                Note: * fields are marked as required
              </p>
            </div>
            <div className="flex flex-row justify-center items-center gap-5">
              <Button
                onClick={handleSubmit}
                type="submit"
                size="lg"
                className="hover:bg-green-400"
              >
                Add Question
              </Button>
              <Button
                className=""
                color="red"
                size="lg"
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
            </div>
          </Modal>
          <Modal
            open={logoutModal}
            closeIcon={Close}
            classNames={{
              modal: "logoutModal",
              overlayAnimationIn: "customEnterOverlayAnimation",
              overlayAnimationOut: "customLeaveOverlayAnimation",
              modalAnimationIn: "customEnterModalAnimation",
              modalAnimationOut: "customLeaveModalAnimation",
            }}
            animationDuration={400}
            onClose={() => setLogoutModal(false)}
            closeOnEsc
            center
            closeOnOverlayClick={false}
            styles={{
              overlay: {
                height: "auto",
              },
            }}
          >
            <div className="flex flex-col  justify-center items-center mt-4">
              <span className="text-xl">Are you sure you want to logout?</span>
              <p className="text-sm">Your session will expire upon logout.</p>
              <div className="flex gap-4 mt-10">
                <Button onClick={handleLogout} size="lg" color="green">
                  Confirm
                </Button>
                <Button
                  onClick={() => setLogoutModal(false)}
                  size="lg"
                  color="red"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default Header;
