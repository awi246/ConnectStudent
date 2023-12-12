import "../../styles/WidgetContent.css";
import image from "../../assets/image.jpeg";
function WidgetContent ()
{
  return (
    <div className=" widget__contents">
      <div className="widget__content">
        <img
          src={ image }
          alt=""
        />
        <div className="widget__contentTitle">
          <h5>Awiral Chand</h5>

        </div>
      </div>
    </div>
  );
}

export default WidgetContent; 
