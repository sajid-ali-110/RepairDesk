import React from "react";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-sm max-w-md w-full text-center">
        <img src={logo} alt="RepairDesk" className="h-12 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to the Dashboard
        </h1>
        <p className="text-gray-500 mb-8">
          You have successfully logged into RepairDesk.
        </p>
        <Button variant="secondary" onClick={handleLogout} className="w-full">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
