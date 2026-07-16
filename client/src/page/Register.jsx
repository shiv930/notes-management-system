import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import axiosInstance from "../api/axiosInstance";
import registerLogo from "../../src/assets/login amico.svg"
import { useDispatch } from "react-redux";
import { addUser } from "../features/authReducer";
const Register = () => {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
 try {
  const res = await axiosInstance.post("/auth/register", data);
 
   console.log(res);
  dispatch(addUser(res.data.data));
  navigate("/")
 } catch (error) {
  console.log(error.message || "register failed");
  
 }
    
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl min-h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side */}
        <div className="md:w-2/5 bg-gradient-to-b from-blue-700 to-blue-950 text-white p-12 flex flex-col justify-between">
          <div>
            <h1 className="text-5xl font-bold mb-4">Create Account</h1>

            <p className="text-lg text-blue-100">
              Join us and start <br />
              taking notes
            </p>
          </div>

          <div className="flex justify-center">
            <img
              src={registerLogo}
              alt=""
              className="w-64"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="md:w-3/5 p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-2">Register</h2>

          <p className="text-gray-500 mb-8">Create your account</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label>Name</label>

              <input
                type="text"
                placeholder="Enter your name"
                className="w-full h-14 border rounded-xl px-4 mt-2"
                {...register("name", {
                  required: "Name is required",
                })}
              />

              <p className="text-red-500 text-sm">{errors.name?.message}</p>
            </div>

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
                    minLength: {
                      value: 6,
                      message: "Password must be 6 characters",
                    },
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

            {/* <div>
              <label>Confirm Password</label>

              <input
                type="password"
                placeholder="********"
                className="w-full h-14 border rounded-xl px-4 mt-2"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />

              <p className="text-red-500 text-sm">
                {errors.confirmPassword?.message}
              </p>
            </div> */}

            <button
              type="submit"
              className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
            >
              Register
            </button>
          </form>

          <p className="text-center mt-8">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
