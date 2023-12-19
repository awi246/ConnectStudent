import "../../styles/WidgetContent.css";
import image from "../../assets/image.jpeg";
function Notification() {
  return (
    <div className=" widget__contents">
      <div className="widget__content">
        <img src={image} alt="" />
        <div className="widget__contentTitle">
          <h5>Test user posted test questions on 2023-12-19 3:55 PM</h5>
        </div>
      </div>
      <div className="widget__content">
        <img src={image} alt="" />
        <div className="widget__contentTitle">
        <h5>Test user posted test questions on 2023-12-19 3:55 PM</h5>

        </div>
      </div>
      <div className="widget__content">
        <img src={image} alt="" />
        <div className="widget__contentTitle">
        <h5>Test user posted test questions on 2023-12-19 3:55 PM</h5>

        </div>
      </div>
    </div>
  );
}

export default Notification;
