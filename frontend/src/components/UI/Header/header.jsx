//inbuild library
import { useState } from "react";

//thirdparty library
import axios from "axios";

//icons
import { FiHome } from "react-icons/fi";
import {
  MdOutlineAssignmentTurnedIn,
  MdOutlineFeaturedPlayList,
} from "react-icons/md";
import { GoPeople } from "react-icons/go";
// import { RxAvatar } from "react-icons/rx";
import { IoNotificationsOutline, IoCloseOutline } from "react-icons/io5";
import { SlLogout } from "react-icons/sl";
import { CiSearch } from "react-icons/ci";
import { Modal } from "react-responsive-modal";
import logo from "../../../assets/smalllogo.ico";
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
  const subjects = [
    "Software Project Manager",
    "Principles of Management",
    "Advance Java",
    "Data Warehouse",
    "Data Mining",
  ];
  const handleSubmit = async () => {
    // if (question !== "") {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = {
      questionName: question,
      questionUrl: inputUrl,
      questionSubject: selectedSubject,
    };
    await axios
      .post("/api/questions", body, config)
      .then((res) => {
        // console.log( res.data );
        alert(res.data.message);
        window.location.href = "/";
      })
      .catch((e) => {
        console.log(e);
        alert("Error in adding question");
      });
    // }
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
        console.log("error in logout");
      });
  };

  return (
    <div className="Header shadow-2xl">
      <div className="flex flex-row items-center gap-8">
        <div>
          <img src={logo} alt="logo" width={56} />
        </div>
        <div className="flex flex-row gap-11">
          <FiHome className="text-2xl cursor-pointer" />
          <MdOutlineFeaturedPlayList className="text-2xl cursor-pointer" />
          <MdOutlineAssignmentTurnedIn className="text-2xl cursor-pointer" />
          <GoPeople className="text-2xl cursor-pointer" />
          <IoNotificationsOutline className="text-2xl cursor-pointer" />
        </div>
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
                    <option key={subject} value={subject}>
                      {subject}
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
            <button
              className="cancel hover:shadow-md"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <Button
              onClick={handleSubmit}
              type="submit"
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
  );
}

export default Header;
