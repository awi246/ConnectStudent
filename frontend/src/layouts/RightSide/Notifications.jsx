import { useEffect, useState } from "react";
import "../../styles/WidgetContent.css";
import NotificationLoading from "../../components/UI/Loading/NotificationLoading/notificationLoading";
import { toast } from "react-toastify";
import BrokenImg from "../../assets/teacher.svg";

function Notification() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:90/api/questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.reverse());
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Error fetching questions data:", error);
      });
  }, []);

  return (
    <div className="widget__contents text-md">
      {loading ? (
       
       <NotificationLoading/>
      ) : questions.length === 0 ? (
        <div className="widget__content">
          <p>No notifications found</p>
        </div>
      ) : (
        questions.slice(0, 5).map((question) => (
          <>
          <div key={question._id} className="flex flex-row p-2">
            <img
              src={question?.userPhoto ?question?.userPhoto : BrokenImg}
              alt="user_photo"
              className="rounded-full w-12 h-12"
            />
            <div className="widget__contentTitle">
              <h5>{`${question.postedBy} posted question of ${
                question.questionSubject
              } on ${new Date(question.createdAt).toLocaleString()}`}</h5>
            </div>
          </div>
          <hr className="border"/>
          </>
        ))
      )}
    </div>
  );
}

export default Notification;
