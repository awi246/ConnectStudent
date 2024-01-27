import WidgetContent from "./WidgetContent.jsx";
import Notification from "./Notifications.jsx";
import "../../styles/Widget.css";
import { IoHeart } from "react-icons/io5";
import notification from "../../assets/bell3d.png";
import { useSelector } from "react-redux";
import { selectUser } from "../../feature/userSlice";

function Widget() {
  const user = useSelector(selectUser);
  return (
    <div className="w-[380px]">
      {(user?.type === "teacher" || user?.role === "Admin") && (
        <div className="widget mb-8 w-full max-h-[400px] overflow-y-auto">
          <div className="widget__header">
            <h5 className="flex flex-row items-center gap-1 font-semibold">
              <span className="text-xl">Notifications</span>
              <img src={notification} width={20} />
            </h5>
          </div>
          <div className="widget__contents">
            <Notification />
          </div>
        </div>
      )}
      <div className="widget w-full">
        <div className="widget__header">
          <h5 className="flex flex-row items-center gap-1">
            Developed with
            <IoHeart className="text-red-500" />
            by:
          </h5>
        </div>
        <div className="widget__contents">
          <WidgetContent />
        </div>
      </div>
    </div>
  );
}

export default Widget;
