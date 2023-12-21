import { useSelector } from "react-redux";
import { selectUser } from "./../../../feature/userSlice";
import "../../../styles/Box.css";

function QuoraBox() {
  const user = useSelector(selectUser);
  return (
    <div className="Box transform cursor-pointer hover:bg-blue-gray-50 shadow-sm hover:shadow-lg hover:scale-105 transition-transform duration-300">
      <div className="Box__info">
        <img src={user?.photo}  className="rounded-full shadow-sm m-auto"/>
      </div>
      <div className="Box__quora text-center pt-2">
        <h5 className="font-medium">Hello <span className="text-red-500">{user?.userName}</span>, {' '}Add your question or go through the answer effortlessly!!!</h5>
      </div>
    </div>
  );
}

export default QuoraBox;
