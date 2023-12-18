import WidgetContent from "./WidgetContent.jsx";
import "../../styles/Widget.css";
import { IoHeart } from "react-icons/io5";

function Widget() {
  return (
    <div className="widget">
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
  );
}

export default Widget;
