import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import regLogo from "../images/registerimg.jpg";

const Register = () => {
  const url = "http://localhost:5000";
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
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
      const { name, email, password, cpassword } = user;
      const res = await fetch(`${url}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          cpassword,
        }),
      });
      const data = await res.json();
      console.log(data);
      setData(data);
      // console.log(data.message);
      if (data.status === 404 || 401) {
        // window.alert("Invalid Register!");
        console.log(data.message);
      } else {
        window.alert("Register succesfully..!");
        console.log(data.message);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
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
        </div>
        <div className="col-sm col-lg-6 col-xl d-none d-md-block">
          <img src={regLogo} className="w-100" alt="register" />
        </div>
      </div>
    </section>
  );
};

export default Register;
