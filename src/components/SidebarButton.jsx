const SidebarButton = ({ children, variant }) => {
  const getVariantClasses = () => {
    if (variant === "unselected") {
      return "text-[#35383E]";
    } else if (variant === "selected") {
      return "bg-[#E6F7F8] text-[#00ADB5]";
    }
  };
  return (
    <a href="#" className={`px-6 py-3 rounded-lg ${getVariantClasses()}`}>
      {children}
    </a>
  );
};

export default SidebarButton;
