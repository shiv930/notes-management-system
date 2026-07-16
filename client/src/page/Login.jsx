import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import axiosInstance from "../api/axiosInstance";
import loginLogo from "../../src/assets/Login-bro.svg"
import { useDispatch } from "react-redux";
import { addUser } from "../features/authReducer";

const Login = () => {
  let navigate = useNavigate()
   let dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
  
    try {
      let res = await axiosInstance.post("/auth/login",data);
       console.log(res);
  dispatch(addUser(res.data.data));
      navigate("/dashboard")
    } catch (error) {
      console.log(error.response?.data?.message ||" login failed");
      
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl min-h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side */}
        <div className="md:w-2/5 bg-gradient-to-b from-blue-700 to-blue-950 text-white p-12 flex flex-col justify-between">
          <div>
            <h1 className="text-5xl font-bold mb-4">Welcome Back!</h1>

            <p className="text-lg text-blue-100">
              Login to continue <br />
              to your account
            </p>
          </div>

          <div className="flex justify-center">
            <img
              src={loginLogo}
              alt=""
              className="w-64"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="md:w-3/5 p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-2">Login</h2>

          <p className="text-gray-500 mb-8">
            Welcome back! Please login to your account
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label>Email</label>

              <input
                type="email"
                placeholder="your@email.com"
                className="w-full h-14 border rounded-xl px-4 mt-2"
                {...register("email", {
                  required: "Email is required",
                })}
              />

              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>

            <div>
              <label>Password</label>

              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className="w-full h-14 border rounded-xl px-4"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4"
                >
                  👁️
                </button>
              </div>

              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>

            <div className="text-right">
              <button type="button" className="text-blue-600">
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-8">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 font-semibold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
