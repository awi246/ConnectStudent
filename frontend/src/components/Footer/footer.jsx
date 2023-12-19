const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="fixed bottom-0 left-0 w-full text-white text-center p-[10px] bg-red-500/90">
      <p>&copy; {currentYear} Connect Students</p>
      <span>For CSIT, By CSIT</span>
    </div>
  );
};

export default Footer;
