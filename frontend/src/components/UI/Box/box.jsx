import { useSelector } from "react-redux";
import { selectUser } from "./../../../feature/userSlice";
import "../../../styles/Box.css";

function QuoraBox() {
  const user = useSelector(selectUser);
  return (
    <div className="Box">
      <div className="Box__info">
        <img src={user?.photo} />
      </div>
      <div className="Box__quora">
        <h5>What is your question or link?</h5>
      </div>
    </div>
  );
}

export default QuoraBox;
