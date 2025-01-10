import { forwardRef } from "react";
import InputLabel from "./InputLabel";

const Input = forwardRef(({ label, errorMessage, ...rest }, ref) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        className="px-4 py-3 border-solid outline-brand-primary border border-[#ECECEC] rounded-lg placeholder:text-sm text-brand-text-gray"
        ref={ref}
        {...rest}
      />
      {errorMessage && (
        <p className="text-left text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  );
});
Input.displayName = "Input";
export default Input;
