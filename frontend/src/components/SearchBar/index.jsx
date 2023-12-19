import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";

function SearchBar() {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    const startAnimation = () => {
      const placeholderText = "Search...";
      let index = 0;
      const intervalId = setInterval(() => {
        setTypedText(placeholderText.substring(0, index));
        index++;

        if (index > placeholderText.length) {
          clearInterval(intervalId);
          setTimeout(startAnimation, 1000);
        }
      }, 150);
    };

    startAnimation();
  }, []);

  return (
    <>
      <div className="Header__input w-[480px] h-[50px]">
        <CiSearch />
        <input type="text" placeholder={typedText} className="max-w-full" />
      </div>
    </>
  );
}

export default SearchBar;
