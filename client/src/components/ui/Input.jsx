import React from "react";

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  className = "",
  error,
}) => {
  return (
    <div className={`flex flex-col relative mb-6 ${className}`}>
      {label && (
        <label className="mb-2 text-base font-medium text-[#000000]">
          {label.split("*").map((part, i, arr) => (
            <React.Fragment key={i}>
              {part}
              {i < arr.length - 1 && <span className="text-primary">*</span>}
            </React.Fragment>
          ))}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className={`px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 text-sm placeholder:text-gray-400 ${
          error
            ? "border-red-500 focus:ring-red-200"
            : "border-gray-200 focus:ring-primary/30 focus:border-primary"
        }`}
      />
      {error && typeof error === "string" && (
        <span className="text-red-500 text-xs mt-1 absolute -bottom-5 left-0">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
