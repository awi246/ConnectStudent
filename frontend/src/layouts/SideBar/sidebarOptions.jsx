import { IoMdAdd } from "react-icons/io";
import "../../styles/SidebarOptions.css";
import image from '../../assets/image.jpeg';
function SidebarOptions ()
{
  return (
    <div className="sidebarOptions">


      <div className="sidebarOption">
        <img
          src={ image } />
        <p>Microprocessor</p>
      </div>

      <div className="sidebarOption">
        <img
          src={ image } />
        <p>Technology</p>
      </div>

      <div className="sidebarOption">
        <img
          src={ image } alt=""
        />
        <p>AI</p>
      </div>
      <div className="sidebarOption">
        <img
          src={ image } alt=""
        />
        <p>Java</p>

      </div>
      <div className="sidebarOption">
        <img
          src={ image } alt=""
        />
        <p>C programming</p>
      </div>
      <div className="sidebarOption">
        <IoMdAdd />
        <p className="text">Add more Subjects</p>
      </div>
    </div>
  );
}

export default SidebarOptions;
