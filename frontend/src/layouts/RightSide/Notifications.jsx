import { useEffect, useState } from "react";
import "../../styles/WidgetContent.css";
import image from "../../assets/image.jpeg";
import { toast } from "react-toastify";

function Notification() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:90/api/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data.reverse()))
      .catch((error) => toast.error("Error fetching questions data:", error));
  }, []);

  return (
    <div className="widget__contents text-md">
      {questions.length === 0 ? (
        <div className="widget__content">
          <p>No notifications found</p>
        </div>
      ) : (
        questions.slice(0, 5).map((question) => (
          <div key={question._id} className="widget__content rounded-lg">
            <img src={image} alt="" />
            <div className="widget__contentTitle">
              <h5>{`${question.postedBy} posted question of ${
                question.questionSubject
              } on ${new Date(
                question.createdAt
              ).toLocaleString()}`}</h5>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Notification;
