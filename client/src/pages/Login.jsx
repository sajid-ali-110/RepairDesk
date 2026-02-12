import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/api/authApi";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { FiEye, FiEyeOff } from "react-icons/fi";
import logo from "../assets/logo.png";
import loginIllustration from "../assets/login_illustration.png";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [login, { isLoading }] = useLoginMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    // Clear general error when user types in any field
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await login(formData).unwrap();
      console.log("Login Success:", res);
      localStorage.setItem("token", res.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setErrors({
        general: err.data?.msg || "Login Failed. Please try again.",
      });
    }
  };

  return (
    <div className="bg-[#eff6f5] min-h-screen flex items-center justify-center p-6">
      <div className="bg-[#ecf3f2] lg:p-5 w-full max-w-6xl rounded-3xl overflow-hidden min-h-[700px]">
        <div className="w-full max-w-6xl bg-white rounded-3xl overflow-hidden min-h-[700px]">
          <div className="flex items-center gap-2 justify-center mt-16">
            <img src={logo} alt="RepairDesk" className="w-[195px] h-[40px]" />
          </div>

          <div className=" text-center">
            <h1 className="text-[48px] font-semibold text-[#000000]">
              Welcome Back!
            </h1>
            <p className="text-[#000000] text-[16px]">
              Please login to your account.
            </p>
          </div>
          <div className="flex">
            <div className="w-full md:w-[55%] flex flex-col justify-center items-center p-8 md:p-12 lg:p-16">
              <div className="w-full max-w-sm">
                <form onSubmit={handleSubmit}>
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                  />

                  <div className="relative mb-2">
                    <Input
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your Password"
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

                  <div className="flex justify-end mb-6">
                    <Link
                      to="/forgot-password"
                      className="text-base text-[#000000] hover:text-primary"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  {/*  */}
                  {errors.general && (
                    <p className="text-red-500 text-sm mb-4 text-center">
                      {errors.general}
                    </p>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-36"
                    isLoading={isLoading}
                  >
                    Login
                  </Button>

                  <div className="mt-8">
                    <p className="text-gray-500 text-sm">
                      Don't have an account?{" "}
                      <Link
                        to="/signup"
                        className="text-primary hover:underline font-medium"
                      >
                        Sign up
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
            <div className="hidden md:flex md:w-[45%] items-center justify-center p-8">
              <img
                src={loginIllustration}
                alt="Login Illustration"
                className="max-w-full max-h-[400px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
