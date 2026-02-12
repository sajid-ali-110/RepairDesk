import React from "react";

const AuthLayout = ({ children, imageSrc, title, subtitle }) => {
  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12 lg:p-24 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Logo Placeholder - You might want to add an actual logo here */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-teal-600"></div>
            </div>
            <span className="text-xl font-semibold text-gray-700">
              RepairDesk
            </span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
            {subtitle && <p className="text-gray-500">{subtitle}</p>}
          </div>

          {children}
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:flex md:w-1/2 bg-gray-50 relative justify-center items-center overflow-hidden">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Authentication Background"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="bg-teal-700 w-full h-full flex items-center justify-center text-white">
            <h2 className="text-4xl font-bold opacity-20">RepairDesk</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
