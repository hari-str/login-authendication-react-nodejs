import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const About = () => {
  const url = "http://localhost:5000";
  const navigate = useNavigate();
  const [userData, setuserData] = useState();

  const callAbout = async () => {
    try {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      };
      const res = await axios.get(`${url}/api/about`, config);
      // console.log(res.data);
      // console.log(res.data.length);
      // console.log(res.data.data[1].name);
      setuserData(res.data);
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };
  useEffect(() => {
    callAbout();
  }, []);
  console.log(userData);
  return (
    <div>
      About
      {/* <h1>{userData.name}</h1>
      <p>{userData}</p>
      <p>{userData}</p> */}
    </div>
  );
};

export default About;
