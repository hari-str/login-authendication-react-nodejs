import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const url = "http://localhost:5000";
  const navigate = useNavigate();
  const logOut = async () => {
    try {
      const res = await axios.get(`${url}/api/logout`);
      console.log(res);
      if (res.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "90vh" }}
    >
      <h1>Welcome to Home Page! ✋</h1>
      <br />
      <br />
      <button type="submit" onClick={logOut} className="btn btn-primary p-2">
        Log out
      </button>
    </div>
  );
};

export default Home;
