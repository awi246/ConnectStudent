import Logo from "../../assets/newLogo.svg";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full text-white text-center bg-red-500/90 max-h-[100px]">
      <div className="flex flex-row justify-center items-center -mb-6">
        <p>&copy; {currentYear} Connect Students™</p>
        <img src={Logo} />
        All Rights Reserved.
      </div>
      <span className="text-lg">For CSIT | By CSIT</span>
    </div>
  );
};

export default Footer;
