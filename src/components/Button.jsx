const Button = ({
  children,
  variant = "primary",
  size = "small",
  className,
  ...rest
}) => {
  const getVariantClasses = () => {
    if (variant === "primary") {
      return "bg-[#00ADB5]  text-white";
    } else if (variant === "ghost") {
      return "bg-transparent text-[#818181]";
    } else if (variant === "secondary") {
      return "bg-[#EEEEEE] text-[#35383E]";
    }
  };

  const getSizeClasses = () => {
    if (size === "small") {
      return "py-1 text-xs";
    } else if (size === "large") {
      return "py-2 text-sm";
    }
  };

  return (
    <button
      className={`flex items-center justify-center px-3 gap-2 rounded-md fonte-semibold transition hover:opacity-75 ${getVariantClasses()} ${getSizeClasses()} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
