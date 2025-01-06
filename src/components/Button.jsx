const Button = ({ children, variant = "primary" }) => {
  const getVariantClasses = () => {
    if (variant === "primary") {
      return "bg-[#00ADB5]  text-white";
    } else if (variant === "ghost") {
      return "bg-transparent text-[#818181]";
    }
  };

  return (
    <button
      className={`flex items-center justify-center gap-2 rounded-md px-3 font-semibold transition hover:opacity-75 ${getVariantClasses()}`}
    >
      {children}
    </button>
  );
};

export default Button;
