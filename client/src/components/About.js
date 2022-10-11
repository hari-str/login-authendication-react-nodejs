import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../Url.js";

const About = () => {
  // const url = "http://localhost:5000";
  const navigate = useNavigate();
  const [userData, setuserData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const callAbout = async () => {
    setIsLoading(true);
    try {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      };
      const res = await axios.get(`${URL}/api/getdata`, config);
      setuserData(res.data.data);
    } catch (err) {
      console.log(err);

      navigate("/login");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    callAbout();
    // setTimeout(() => setIsLoading(false), 5500);
  }, []);

  console.log(userData);
  return (
    <div className="container">
      {isLoading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div className="row p-4 about_page">
        <div className="col-md-4">
          <img
            src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
            alt="yourpic"
            className="w-100"
          />
        </div>
        <div className="col-md-6 col-xl">
          <div className="row mb-5 align-items-center">
            <div className="col-md-10">
              <h3 className="fw-bold">{userData?.name}</h3>
            </div>
            <div className="col-md">
              <button type="button" className="btn btn-outline-primary btn-sm">
                Edit
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <h5 className="text-info text-decoration-underline">About</h5>
          </div>
          <div className="row mb-3">
            <div className="col-md">
              <label className="fw-semibold">UserId</label>
            </div>
            <div className="col-md">{userData?._id}</div>
          </div>
          <div className="row  mb-3">
            <div className="col-md">
              <label className="fw-semibold">Name</label>
            </div>
            <div className="col-md">{userData?.name}</div>
          </div>
          <div className="row  mb-3">
            <div className="col-md">
              <label className="fw-semibold">Email</label>
            </div>
            <div className="col-md">{userData?.email}</div>
          </div>
          <div className="row  mb-3">
            <div className="col-md">
              <label className="fw-semibold">Mobile</label>
            </div>
            <div className="col-md">{userData?.mobile}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
