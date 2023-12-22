import "../../styles/WidgetContent.css";
import fb from "../../assets/fb.gif";
import insta from "../../assets/insta.gif";
import linkedin from "../../assets/linkedin.gif";
function WidgetContent() {
  return (
    <div className=" widget__contents">
      <div className="widget__content">
        <div className="ml-2 flex items-center justify-between w-full">
          <h5>Manoj Khatri</h5>
          <div className="flex">
            <img src={fb} width={40} />
            <img src={insta} width={40} />
            <img src={linkedin} width={40} />
          </div>
        </div>
      </div>
      <div className="widget__content">
        <div className="ml-2 flex items-center justify-between w-full">
          <h5>Awiral Chand</h5>
          <div className="flex">
            <img src={fb} width={40} />
            <img src={insta} width={40} />
            <img src={linkedin} width={40} />
          </div>
        </div>
      </div>
      <div className="widget__content">
        <div className="ml-2 flex items-center justify-between w-full">
          <h5>Ganesh Acharya</h5>
          <div className="flex">
            <img src={fb} width={40} />
            <img src={insta} width={40} />
            <img src={linkedin} width={40} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WidgetContent;
