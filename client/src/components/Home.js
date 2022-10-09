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
      <div className="text-center">
        <h1>Welcome to Home Page! ✋</h1>

        <button type="submit" onClick={logOut} className="btn btn-danger">
          Log out
        </button>
      </div>
    </div>
  );
};

export default Home;
