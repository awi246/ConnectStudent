import WidgetContent from "./WidgetContent.jsx";
import Notification from "./Notifications.jsx";
import "../../styles/Widget.css";
import { IoHeart, IoNotifications } from "react-icons/io5";

function Widget() {
  return (
    <div className="w-[350px]">
      <div className="widget mb-8 w-full">
        <div className="widget__header">
          <h5 className="flex flex-row items-center gap-1 font-semibold">
            Notifications(3)
            <IoNotifications className="text-blue-500 text-xl" />
          </h5>
        </div>
        <div className="widget__contents">
          <Notification />
        </div>
      </div>
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
