import React from "react";

const InputBox = ({
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  required = false,
  disabled = false,
  className = "",
  error = false,
  ...props
}) => {
  const baseClasses =
    "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors";
  const normalClasses =
    "border-gray-300 hover:ring-2 hover:ring-green-500 focus:ring-green-500 focus:border-transparent";
  const errorClasses = "border-red-500 focus:ring-red-500";
  const disabledClasses = "bg-gray-100 cursor-not-allowed";

  const inputClasses = `
    ${baseClasses}
    ${error ? errorClasses : normalClasses}
    ${disabled ? disabledClasses : ""}
    ${className}
  `.trim();

  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      className={inputClasses}
      {...props}
    />
  );
};

export default InputBox;
