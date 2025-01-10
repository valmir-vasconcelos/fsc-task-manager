import { forwardRef } from "react";
import InputLabel from "./InputLabel";

const TimeSelect = forwardRef((props, ref) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor="time">Horário</InputLabel>
      <select
        id="time"
        className="px-4 py-3 border-solid outline-brand-primary border border-[#ECECEC] rounded-lg placeholder:text-sm text-brand-text-gray"
        {...props}
        ref={ref}
      >
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>
      {props.errorMessage && (
        <p className="text-left text-xs text-red-500">{props.errorMessage}</p>
      )}
    </div>
  );
});
TimeSelect.displayName = "TimeSelect";
export default TimeSelect;
