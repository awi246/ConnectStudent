/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { Modal } from "react-responsive-modal";
import axios from "axios";
import { Tooltip } from "@material-tailwind/react";
import { IoArrowDown, IoArrowUp, IoClose } from "react-icons/io5";
import { CiChat2 } from "react-icons/ci";
// import { FiMoreHorizontal } from "react-icons/fi";
import { CiShare2 } from "react-icons/ci";
import BrokenImg from "../../../assets/brokeImg.png";
import ReactHtmlParser from "html-react-parser";
import ReactTimeAgo from "react-time-ago";
import { ToastContainer, toast } from "react-toastify";
import "../../../styles/Post.css";
import "react-responsive-modal/styles.css";
import "react-quill/dist/quill.snow.css";
import { Button } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../feature/userSlice";

function LastSeen({ date }) {
  return (
    <div>
      <ReactTimeAgo date={date} locale="en-US" timeStyle="round" />
    </div>
  );
}

function Post({ post }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [voted, setVoted] = useState(null);
  // const [showOptions, setShowOptions] = useState(false);
  const user = useSelector(selectUser);
  useEffect(() => {
    const checkVoteStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:90/api/votes/check`,
          { params: { questionId: post?._id, userId: user?._id } }
        );
        setVoted(response.data.voteType);
      } catch (error) {
        toast.error("Failed to check vote");
      }
    };

    checkVoteStatus();
  }, [post, user]);

  const handleQuill = (value) => {
    setAnswer(value);
  };

  const handleSubmit = async () => {
    if (post?._id && answer !== "") {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = {
        answer: answer,
        questionId: post?._id,
        user: user,
      };
      try {
        await axios.post("http://localhost:90/api/answers", body, config);
        setIsModalOpen(false);
        toast.success("Answer added successfully");
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      } catch (error) {
        setIsModalOpen(false);
        toast.error(error?.response?.data?.message || "Failed to add answer");
      }
    }
  };

  const handleVote = async (voteType) => {
    try {
      const url = `http://localhost:90/api/votes/${voteType}`;

      if (voted === voteType) {
        await axios.delete(url, {
          params: {
            questionId: post?._id,
            userId: user?._id,
          },
        });
        setVoted(null);
        toast.success("Vote removed successfully");
      } else {
        const voteData = {
          voteType: voteType,
          questionId: post?._id,
          user: user,
        };
        await axios.post(url, voteData);
        setVoted(voteType);
        toast.success("Vote added successfully");
      }
    } catch (error) {
      toast.error("Failed to vote");
    }
  };

  const handleEdit = () => {
    // console.log("Edit button clicked");
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:90/api/questions/${post?._id}`
      );
      if (response.data.status) {
        toast.success("Question deleted successfully");
      } else {
        toast.error("Failed to delete question");
      }
    } catch (error) {
      toast.error("Failed to delete question");
    }
  };

  const sortedAnswers =
    post?.allAnswers?.sort((a, b) => {
      const aVotes = a?.votes?.upvote ?? 0 - a?.votes?.downvote ?? 0;
      const bVotes = b?.votes?.upvote ?? 0 - b?.votes?.downvote ?? 0;
      return bVotes - aVotes;
    }) || [];
  return (
    <>
      <ToastContainer autoClose={2800} />
      <div className="post rounded-md shadow-lg border hover:bg-[#F2F5FF]">
        <div className="post__info">
          <img
            src={post?.user?.photo ? post?.user?.photo : BrokenImg}
            width={48}
            className="rounded-full"
          />
          <h4>{post?.user?.userName}</h4>
          <small>
            <LastSeen date={post?.createdAt} />
          </small>
        </div>
        <div className="post__body">
          <div className="post__question">
            <p>{post?.questionName}</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="post__btnAnswer"
            >
              Answer
            </button>
            <Modal
              open={isModalOpen}
              closeIcon={<IoClose />}
              onClose={() => setIsModalOpen(false)}
              closeOnEsc
              center
              closeOnOverlayClick={false}
              classNames={{
                modal: "answermodal",
                modalAnimationIn: "customEnterModalAnimation",
                modalAnimationOut: "customLeaveModalAnimation",
              }}
              styles={{
                overlay: {
                  height: "auto",
                },
              }}
            >
              <div className="modal__question">
                <h1>{post?.questionName}</h1>
                <p>
                  asked by <span className="name">{post?.user?.userName}</span>{" "}
                  on{" "}
                  <span className="name">
                    {new Date(post?.createdAt).toLocaleString()}
                  </span>
                </p>
              </div>
              <div className="modal__answer">
                <ReactQuill
                  value={answer}
                  onChange={handleQuill}
                  placeholder="Enter your answer"
                />
              </div>
              <div className="modal__button">
                <button
                  className="cancle"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button onClick={handleSubmit} type="submit" className="add">
                  Add Answer
                </button>
              </div>
            </Modal>
          </div>
          {post && post.questionUrl !== "" && (
            <img src={post.questionUrl} alt="url" />
          )}
        </div>
        <div className="post__footer">
          <div className="flex items-center gap-4 text-2xl w-full justify-between mt-6">
            <div className="post__footerAction space-x-6">
              <Tooltip content="Up vote">
                <p
                  onClick={() => handleVote("upvote")}
                  className={`cursor-pointer ${
                    voted === "upvote" ? "text-blue-500" : ""
                  }`}
                >
                  <IoArrowUp />
                </p>
              </Tooltip>
              <Tooltip content="Down vote">
                <p
                  onClick={() => handleVote("downvote")}
                  className={`cursor-pointer ${
                    voted === "downvote" ? "text-red-500" : ""
                  }`}
                >
                  <IoArrowDown />
                </p>
              </Tooltip>
            </div>

            <p className="cursor-pointer" onClick={() => setIsModalOpen(true)}>
              <CiChat2 />
            </p>

            <div className="post__footerLeft flex items-center gap-2">
              <p className="cursor-pointer mr-2">
                <CiShare2 />
              </p>

              {user && (
                <>
                  <div className="flex flex-row gap-4">
                    {user.type === "teacher" && (
                      <Button
                        onClick={handleDelete}
                        className="option-button"
                        size="sm"
                      >
                        Delete
                      </Button>
                    )}
                    {user?.uid === post?.uid && (
                      <Button
                        onClick={handleEdit}
                        className="option-button"
                        size="sm"
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <p
          style={{
            color: "rgba(0,0,0,0.5)",
            fontSize: "12px",
            fontWeight: "bold",
            margin: "10px 0",
          }}
        >
          {sortedAnswers.length} Answer(s)
        </p>
        <div
          style={{
            margin: "5px 0px 0px 0px ",
            padding: "5px 0px 0px 20px",
            borderTop: "1px solid lightgray",
          }}
          className="post__answer"
        >
          {sortedAnswers?.map((_a) => (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  padding: "10px 5px",
                  borderTop: "1px solid lightgray",
                }}
                className="post-answer-container"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#888",
                  }}
                  className="post-answered"
                >
                  <img
                    src={_a?.user?.photo ? _a?.user?.photo : BrokenImg}
                    alt="user"
                    className="rounded-full"
                    width={40}
                  />

                  <div
                    style={{
                      margin: "0px 10px",
                    }}
                    className="post-info"
                  >
                    <p>{_a?.user?.userName}</p>
                    <span>
                      <LastSeen date={_a?.createdAt} />
                    </span>
                  </div>
                </div>
                <div className="post-answer">{ReactHtmlParser(_a?.answer)}</div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default Post;
