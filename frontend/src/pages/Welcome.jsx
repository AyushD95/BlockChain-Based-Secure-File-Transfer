import React, { useState } from "react";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";
import { Navigate, useLocation, useNavigate } from "react-router";

const Welcome = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const Logout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  if (!location.state?.token) {
    return <Navigate to="/" replace />;
  }




  return (
    <div className="w-screen h-screen flex flex-col bg-black">

      <div className="navbar bg-formBg">
        <div className="flex-1">
          <a className="btn btn-ghost text-4xl">BlockVault </a>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div role="button" tabIndex={0} className="avatar online placeholder">
              <div className="bg-neutral text-white w-14 rounded-full">
                <span className="text-2xl">{location.state?.name?.[0] }</span>
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <a className="justify-between">Profile</a>
              </li>
              <li onClick={Logout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>


      <div className="flex-1 bg-black text-white flex flex-col items-center justify-center p-5">
        <h1 className="text-4xl font-bold text-center">Welcome to BlockVault </h1>
        <p className="text-lg text-gray-300 text-center max-w-2xl mt-4">
        A trusted platform for decentralized and secure file sharing. With end-to-end encryption, tamper-proof security, and seamless peer-to-peer transfers, your data remains private and protected. Share files with confidence, backed by the power of blockchain technology!        </p>

      </div>
    </div>
  );
};

export default Welcome;
