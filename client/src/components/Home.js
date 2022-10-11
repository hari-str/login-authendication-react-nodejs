import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../Url";

const Home = () => {
  const [userData, setUserData] = useState("");
  const [show, setShow] = useState(false);

  const homeData = async () => {
    try {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      };

      const res = await axios.get(`${URL}/api/getdata`, config);
      console.log(res.data.data);
      setUserData(res.data.data);
      setShow(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    homeData();
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <div className="text-center">
        <h5
          className="mb-1 fw-bold"
          style={{ color: "#0d1cff", letterSpacing: "3px" }}
        >
          WELCOME
        </h5>
        <h1 className="fw-bold display-5">{userData?.name}</h1>
        <div>
          {show ? (
            <h4>Happy to see you back✋</h4>
          ) : (
            <h1 className="fw-bold display-5">This is Home page</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
