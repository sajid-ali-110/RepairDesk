import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  isLoading = false,
  ...props
}) => {
  const baseStyles =
    "py-3 px-8 rounded-lg font-semibold transition-all duration-200 flex justify-center items-center cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-[#439288] hover:bg-[#439288]/80 text-white shadow-md hover:shadow-lg",
    secondary:
      "bg-[#CBD5E1]/80 hover:bg-[#CBD5E2]/80 text-white shadow-md hover:shadow-lg",
    ghost: "bg-transparent text-primary hover:text-primary-dark",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <svg
            className="animate-spin h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
