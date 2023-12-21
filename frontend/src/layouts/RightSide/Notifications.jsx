import "../../styles/WidgetContent.css";
import image from "../../assets/image.jpeg";
function Notification() {
  return (
    <div className=" widget__contents">
      <div className="widget__content bg-blue-200/25 rounded-lg">
        <img src={image} alt="" />
        <div className="widget__contentTitle">
          <h5>Test user posted on 2023-12-19 3:55 PM</h5>
        </div>
      </div>
      <div className="widget__content bg-blue-200/25 rounded-lg">
        <img src={image} alt="" />
        <div className="widget__contentTitle">
          <h5>Test user answered on 2023-12-11 4:20 PM</h5>
        </div>
      </div>
      <div className="widget__content rounded-lg">
        <img src={image} alt="" />
        <div className="widget__contentTitle">
          <h5>Test user posted on 2023-12-09 11:05 AM</h5>
        </div>
      </div>
      <div className="widget__content rounded-lg">
        <img src={image} alt="" />
        <div className="widget__contentTitle">
          <h5>Test user answered on 2023-12-06 7:45 PM</h5>
        </div>
      </div>
    </div>
  );
}

export default Notification;
