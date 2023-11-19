import { Add } from "@material-ui/icons";
import React from "react";
import "./css/SidebarOptions.css";

function SidebarOptions() {
  return (
    <div className="sidebarOptions">
  

      <div className="sidebarOption">
        <img
 src="https://media.licdn.com/dms/image/C4D0BAQHJvBzaTd8Bvw/company-logo_400_400/0/1670131210535?e=1707350400&v=beta&t=GzZDgZA3WMxpio_osxGeU5IwXLGs7wG9mOOUWqvdyUw"          alt=""
        />
        <p>Microprocessor</p>
      </div>

      <div className="sidebarOption">
        <img
 src="https://media.licdn.com/dms/image/C4D0BAQHJvBzaTd8Bvw/company-logo_400_400/0/1670131210535?e=1707350400&v=beta&t=GzZDgZA3WMxpio_osxGeU5IwXLGs7wG9mOOUWqvdyUw"          alt=""
        />
        <p>Technology</p>
      </div>

      <div className="sidebarOption">
        <img
         src="https://media.licdn.com/dms/image/C4D0BAQHJvBzaTd8Bvw/company-logo_400_400/0/1670131210535?e=1707350400&v=beta&t=GzZDgZA3WMxpio_osxGeU5IwXLGs7wG9mOOUWqvdyUw"
          alt=""
        />
        <p>AI</p>
      </div>
      <div className="sidebarOption">
        <img
         src="https://media.licdn.com/dms/image/C4D0BAQHJvBzaTd8Bvw/company-logo_400_400/0/1670131210535?e=1707350400&v=beta&t=GzZDgZA3WMxpio_osxGeU5IwXLGs7wG9mOOUWqvdyUw"
          alt=""
        />
        <p>Java</p>
        
      </div>
      <div className="sidebarOption">
        <img
         src="https://media.licdn.com/dms/image/C4D0BAQHJvBzaTd8Bvw/company-logo_400_400/0/1670131210535?e=1707350400&v=beta&t=GzZDgZA3WMxpio_osxGeU5IwXLGs7wG9mOOUWqvdyUw"
          alt=""
        />
        <p>C programming</p>
      </div>
      <div className="sidebarOption">
        <Add />
        <p className="text">Add more Subjects</p>
      </div>
    </div>
  );
}

export default SidebarOptions;
