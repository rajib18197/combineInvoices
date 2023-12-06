import { forwardRef } from "react";

const Select = forwardRef(function Select(
  { options, onChange = () => {}, value, className = "", ...props },
  ref
) {
  const classNames = className
    ? className
    : "bg-gray-800 rounded-md p-1 focus:outline-none font-semibold flex-1 focus:ring-2 ring-indigo-700";

  return (
    <select
      value={value}
      onChange={onChange}
      {...props}
      className={classNames}
      ref={ref}
    >
      <option hidden>Select a value</option>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});

export default Select;
