//inbuild library
import { useEffect, useState } from "react";

//thirdparty library
import axios from "axios";

// import { RxAvatar } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { SlLogout } from "react-icons/sl";
import { CiSearch } from "react-icons/ci";
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

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const Close = <IoCloseOutline />;
  const [subjects, setSubjects] = useState([]);

  const [scrolling, setScrolling] = useState(false);

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
      uid: user?.uid,
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
          <div>
            <img src={logo} alt="logo" width={150} />
          </div>

          {/* <FiHome className="text-2xl cursor-pointer" /> */}

          <div className="Header__input">
            <CiSearch />
            <input type="text" placeholder="Search questions..." />
          </div>
          <div className="flex flex-row items-center gap-6">
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
            closeOnEsc
            center
            closeOnOverlayClick={false}
            styles={{
              overlay: {
                height: "auto",
              },
            }}
          >
            <div className="modal__title">
              <h5>Add Question</h5>
              <h5>Share Link</h5>
            </div>

            <div className="">
              <div className="">
                {/* <RxAvatar size={40}/> */}
                <div className="modal__scope w-full flex justify-between p-3">
                  <label htmlFor="subjects" className="font-medium">
                    Select Subject:
                  </label>
                  <select
                    id="subjects"
                    value={selectedSubject}
                    className="font-medium"
                    onChange={(e) => setSelectedSubject(e.target.value)}
                  >
                    <option value="">Please choose subject</option>
                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.name}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                type=" text"
                className="p-3 mb-5 mt-4 shadow-lg border rounded-md w-full"
                placeholder="Start your question with 'What', 'How', 'Why', etc. "
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  className="p-3 mb-5 mt-4 shadow-lg border rounded-md w-full"
                  placeholder="Optional: Inclue a link that gives context or the image"
                />
                {inputUrl !== "" && (
                  <img
                    width={300}
                    src={inputUrl}
                    alt="displayimage"
                    onError={(e) => {
                      e.target.src = alternateImg;
                    }}
                  />
                )}
              </div>
            </div>
            <div className="modal__buttons">
              <Button
                className=""
                color="red"
                size="lg"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                type="submit"
                size="lg"
                className="hover:bg-green-400"
              >
                Add Question
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
            <div className="flex flex-col gap-8 justify-center items-center mt-4">
              <span className="text-xl">Are you sure you want to logout</span>
              <div className="flex gap-10">
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
