import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import regLogo from "../images/registerimg.jpg";
import { URL } from "../Url.js";

const Register = () => {
  // const url = "http://localhost:5000";
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });
  const [data, setData] = useState([]);

  let name, value;

  const handleInputs = (e) => {
    // console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    try {
      e.preventDefault();
      const { name, email, mobile, password, cpassword } = user;

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        `${URL}/api/register`,
        { name, email, mobile, password, cpassword },
        config
      );
      setData(res);
      // console.log(data.message);

      if (res.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err.response.data);
      setData(err.response.data);
    }
  };

  return (
    <section className="container pt-4 pb-4">
      <div className="row align-items-center">
        <div className="col-sm col-lg-6 col-xl">
          <div className=" mb-5">
            <h1 style={{ fontWeight: "600" }}>Register</h1>
          </div>

          {data.message && (
            <div className="col-xl-8 p-3 alert alert-danger" role="alert">
              {data.message}
            </div>
          )}
          <form method="POST" className="col-xl-8">
            <div className="mb-3 ">
              <input
                type="text"
                className="form-control p-2"
                placeholder="Username"
                name="name"
                value={user.name}
                onChange={handleInputs}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control p-2"
                name="email"
                value={user.email}
                onChange={handleInputs}
                placeholder="Email"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 ">
              <input
                type="number"
                className="form-control p-2"
                placeholder="Mobile"
                name="mobile"
                value={user.mobile}
                onChange={handleInputs}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control p-2"
                name="password"
                value={user.password}
                onChange={handleInputs}
                placeholder="Password"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control p-2"
                name="cpassword"
                value={user.cpassword}
                onChange={handleInputs}
                placeholder="Confirm Password"
              />
            </div>

            <button
              type="submit"
              onClick={postData}
              className="btn btn-primary p-2 w-100"
            >
              Register
            </button>
          </form>

          <p className="mt-3 text-center col-xl-8">
            I have already account
            <NavLink to="/login" className="px-2">
              Login
            </NavLink>
          </p>
        </div>
        <div className="col-sm col-lg-6 col-xl d-none d-md-block">
          <img src={regLogo} className="w-100" alt="register" />
        </div>
      </div>
    </section>
  );
};

export default Register;
