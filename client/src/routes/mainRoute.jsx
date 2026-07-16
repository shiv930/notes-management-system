import React, { useEffect } from "react";
import { Routes, Route } from "react-router";

import Login from "../page/Login";
import Register from "../page/Register";

import Dashboard from "../page/Dashboard";
import Notes from "../page/Notes";
import AddNote from "../page/AddNote";
import EditNote from "../page/EditNote";

import PublicRoutes from "../routes/proctected/PublicRoutes";
import ProtectedRoutes from "../routes/proctected/ProtectedRoutes";
import Profile from "../page/Profile";
import NotePreview from "../page/NotePreview";
import { useDispatch } from "react-redux";
import axiosInstance from "../api/axiosInstance";
import { addUser, removeUser } from "../features/authReducer";

const MainRoute = () => {

 const dispatch = useDispatch();
 const hydration = async()=>{
  try {
    let res = await axiosInstance.get("/me/check",)
    console.log(res)
    dispatch(addUser((await res.data.data)))
  } catch (error) {
    dispatch(removeUser())
    console.log("error from hydration function ", error.message);
    
  }
 }


 useEffect(()=>{
   hydration()
 },[])


  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <PublicRoutes>
            <Login />
          </PublicRoutes>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoutes>
            <Register />
          </PublicRoutes>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/notes"
        element={
          <ProtectedRoutes>
            <Notes />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/add-note"
        element={
          <ProtectedRoutes>
            <AddNote />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/edit-note/:id"
        element={
          <ProtectedRoutes>
            <EditNote />
          </ProtectedRoutes>
        }
      />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/note/:id"
          element={
            <ProtectedRoutes>
              <NotePreview />
            </ProtectedRoutes>
          }
        />
    </Routes>
  );
};

export default MainRoute;
