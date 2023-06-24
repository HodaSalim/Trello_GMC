import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Index from "./Pages/IndexPage/Index";
import Login from "./Pages/LoginPage/Login";
import Register from "./Pages/RegisterPage/Register";
import Alert from "./Components/AlertSnackBar";
import Boards from "./Pages/BoardsPage/Boards";
import Board from "./Pages/BoardPage/Board";

import { loadUser } from "./Services/userService";
import Store from "./Redux/Store";

import { ProtectedRoute } from "./Components/ProtectedRoute";

const App = () => {
  useEffect(() => {
    loadUser(Store.dispatch);
  }, []);

  return (
    <>
      <Alert />

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/boards"
          element={
            <ProtectedRoute>
              <Boards />
            </ProtectedRoute>
          }
        />

        <Route
          path="/boards/:id"
          element={
            <ProtectedRoute>
              <Board />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
