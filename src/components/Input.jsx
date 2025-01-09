const Input = ({ label, ...rest }) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <label htmlFor={rest.id} className="text-sm font-semibold text-[#35383E]">
        {label}
      </label>
      <input
        className="px-4 py-3 border-solid outline-[#00ADB5] border border-[#ECECEC] rounded-lg placeholder:text-sm text-[#9A9C9F]"
        {...rest}
      />
    </div>
  );
};

export default Input;
