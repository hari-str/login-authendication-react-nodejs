import React, { createContext, useReducer } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import Errorpage from "./components/Errorpage";
import axios from "axios";
import { initialState, reducer } from "./reducer/UseReducer";
import "./App.css";

axios.defaults.withCredentials = true;

//contextApi
export const UserContext = createContext();

const Routing = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/about" element={<About />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/logout" element={<Logout />}></Route>
        <Route exact path="*" element={<Errorpage />}></Route>
      </Routes>
    </>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="App">
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routing />
      </UserContext.Provider>
    </div>
  );
};

export default App;
