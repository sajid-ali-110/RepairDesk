import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../redux/api/authApi";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { FiEye, FiEyeOff } from "react-icons/fi";
import logo from "../assets/logo.png";
import phone from "../assets/phone.png";
import RepairShop from "../assets/repair.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const repairItems = [
  "Phones",
  "Phones",
  "Phones",
  "Phones",
  "Phones",
  "Phones",
];

const Signup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    email: "",
    websiteUrl: "",
    phone: "",
    password: "",
    repairItems: [],
    additionalInfo: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [register, { isLoading }] = useRegisterMutation();

  const [selectedRepairItems, setSelectedRepairItems] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.businessName)
      newErrors.businessName = "Business Name is required";
    if (!formData.email) newErrors.email = "Business Email is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setCurrentStep(2);
  };

  const toggleRepairItem = (index) => {
    if (selectedRepairItems.includes(index)) {
      setSelectedRepairItems(selectedRepairItems.filter((i) => i !== index));
    } else {
      setSelectedRepairItems([...selectedRepairItems, index]);
    }
    if (errors.repairItems) {
      setErrors((prev) => {
        const { repairItems, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedRepairItems.length === 0) {
      setErrors({ repairItems: "Please select at least one item you repair." });
      return;
    }

    const finalData = {
      ...formData,
      repairItems: selectedRepairItems.map((i) => repairItems[i]),
    };

    try {
      const res = await register(finalData).unwrap();
      console.log("Registration Success:", res);
      setIsSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error(err);
      setErrors({ general: err.data?.msg || "Registration failed" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#eff6f5]">
      <div className="bg-[#ecf3f2] lg:p-5 w-full max-w-7xl rounded-3xl overflow-hidden min-h-[700px]">
        <div className="w-full max-w-7xl bg-white rounded-3xl overflow-hidden flex min-h-[700px]">
          {/* Left Side - Form (Width 60%) */}
          <div className="w-full md:w-[55%] flex flex-col justify-center p-8 md:p-12 lg:p-14 overflow-y-auto">
            <div className="w-full max-w-xl mx-auto">
              <div className="flex items-center gap-2 mb-8">
                <img
                  src={logo}
                  alt="RepairDesk"
                  className="w-[195px] h-[40px]"
                />
              </div>

              {/* Stepper */}
              <div className="flex items-center gap-45 mb-8 px-2 relative">
                <div className="w-[243px] absolute left-7 right-6 top-[8px] h-px bg-gray-200 z-0"></div>
                <div className="relative z-10 flex flex-col">
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-xs font-medium ${currentStep >= 1 ? "bg-[#43928880] text-white" : "bg-[#43928880] text-gray-500"}`}
                  >
                    1
                  </div>
                  <span className={`text-xs font-medium mt-2 text-[#94A3B8]`}>
                    Personal Details
                  </span>
                </div>
                <div className="w-[266px] absolute right-0 top-[8px] h-px bg-gray-200 z-0"></div>
                <div className="relative z-10 flex flex-col">
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-xs font-medium ${currentStep === 2 ? "bg-primary text-white" : "bg-[#E2E8F0] text-white"}`}
                  >
                    2
                  </div>
                  <span className={`text-xs font-medium mt-2 text-[#94A3B8]`}>
                    Business Details
                  </span>
                </div>
              </div>

              {currentStep === 1 ? (
                <form onSubmit={handleNext}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                    <Input
                      label="Full Name *"
                      name="fullName"
                      placeholder="Enter Full Name"
                      value={formData.fullName}
                      onChange={handleChange}
                      error={errors.fullName}
                    />
                    <Input
                      label="Business Name *"
                      name="businessName"
                      placeholder="Business Name"
                      value={formData.businessName}
                      onChange={handleChange}
                      error={errors.businessName}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                    <Input
                      label="Business Email *"
                      type="email"
                      name="email"
                      placeholder="Enter Business Email"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                    />
                    <Input
                      label="Website URL"
                      name="websiteUrl"
                      placeholder="Website URL"
                      value={formData.websiteUrl}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="relative mb-6">
                    <div className="relative mb-6">
                      <label className="mb-2 text-base font-medium text-[#000000] block">
                        Phone <span className="text-primary">*</span>
                      </label>
                      <PhoneInput
                        country={"pk"}
                        value={formData.phone}
                        onChange={(phone) => {
                          setFormData({ ...formData, phone: phone });
                          if (errors.phone) {
                            setErrors((prev) => {
                              const newErrors = { ...prev };
                              delete newErrors.phone;
                              return newErrors;
                            });
                          }
                        }}
                        containerClass="!w-full"
                        inputClass={`!w-full !h-[46px] !pl-[48px] !pr-4 !py-3 !border !rounded-lg !text-sm !transition-all !duration-200 placeholder:!text-gray-400 focus:!outline-none focus:!ring-2 ${
                          errors.phone
                            ? "!border-red-500 focus:!ring-red-200"
                            : "!border-gray-200 focus:!ring-primary/30 focus:!border-primary"
                        }`}
                        buttonClass={`!border-gray-200 !rounded-l-lg ${
                          errors.phone ? "!border-red-500" : ""
                        }`}
                      />
                      {errors.phone && (
                        <span className="text-red-500 text-xs mt-1 absolute -bottom-5 left-0">
                          {errors.phone}
                        </span>
                      )}
                    </div>
                    {errors.phone && (
                      <span className="text-red-500 text-xs mt-1 absolute -bottom-5 left-0">
                        {errors.phone}
                      </span>
                    )}
                  </div>
                  <div className="relative mb-2">
                    <Input
                      label="Password *"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Create a Password"
                      value={formData.password}
                      onChange={handleChange}
                      error={errors.password}
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-[47px] text-gray-400 hover:text-gray-600 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  <Button type="submit" variant="primary" className="w-36 mt-8">
                    Continue
                  </Button>
                </form>
              ) : (
                <div className="w-full">
                  <h2 className="text-[16px] font-medium mb-4 text-[#000000]">
                    What Items do you Repair?
                  </h2>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                    {repairItems.map((item, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => toggleRepairItem(index)}
                        className={`flex items-center gap-2 px-4 py-3 border rounded-lg transition-all text-[16px] cursor-pointer ${selectedRepairItems.includes(index) ? "border-primary bg-primary-light text-primary" : "border-[#E0E0E0] text-gray-600 hover:border-primary/40"}`}
                      >
                        <img src={phone} alt="phone" className="h-[23px]" />
                        <span className="font-normal text-[16px] text-[#1E293B]">
                          {item}
                        </span>
                      </button>
                    ))}
                  </div>
                  {errors.repairItems && (
                    <p className="text-red-500 mb-4 text-sm">
                      {errors.repairItems}
                    </p>
                  )}
                  <div className="mb-6">
                    <label className="block text-[16px] font-medium text-[#000000] mb-2">
                      Anything else you would like us to know?
                    </label>
                    <textarea
                      name="additionalInfo"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-200 min-h-[100px] text-sm placeholder:text-gray-400 resize-none"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  {errors.general && (
                    <p className="text-red-500 mb-4 text-sm">
                      {errors.general}
                    </p>
                  )}
                  {isSuccess && (
                    <p className="text-primary font-medium mb-4 text-sm">
                      Account created successfully! Redirecting to login...
                    </p>
                  )}
                  <div className="flex gap-3">
                    <Button
                      variant="secondary"
                      onClick={() => setCurrentStep(1)}
                      className="w-32"
                      disabled={isLoading || isSuccess}
                    >
                      Go Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      variant="primary"
                      className="w-36"
                      isLoading={isLoading}
                      disabled={isSuccess}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Image Overlay (Width 40%) */}
          <div className="hidden md:flex md:w-[45%] relative overflow-hidden rounded-r-2xl">
            <img
              src={RepairShop}
              alt="Repair Shop"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a4a42]/75 via-[#1a4a42]/60 to-[#1a4a42]/30"></div>
            <div className="absolute bottom-48 left-10 right-10 text-white">
              <p className="text-[#F7B84B] font-semibold mb-1 text-[24px]">
                Welcome to
              </p>
              <h2 className="text-[32px] font-semibold mb-2 leading-white">
                Modern Repair Shop
                <br />
                Software
              </h2>
              <p className="text-white mb-6 text-[16px] leading-relaxed line-height-[26px]">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </p>
              <div className="flex items-center gap-6">
                <div className="flex text-gold text-lg">★ ★ ★ ★ ★</div>
                <span className="text-white text-[16px]">
                  Based on 500+ reviews on
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
