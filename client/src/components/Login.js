import React, { useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import logLogo from "../images/loginimg.jpg";
import { URL } from "../Url.js";
import { UserContext } from "../App";

const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };
      const res = await axios.post(
        `${URL}/api/login`,
        { email: email, password: password },
        config
      );

      // console.log(res);
      setData(res);

      if (res.status === 200) {
        dispatch({ type: "USER", payload: true });
        window.alert("Login Successfull");
        navigate("/");
        // localStorage.setItem("userInfo", JSON.stringify(state));
      }
    } catch (err) {
      console.log(err.response.data);
      setData(err.response.data);
    }
    // console.log(data);
  }

  console.log(data);

  return (
    <section className="container pt-3 pb-4">
      <div className="row  justify-content-center ">
        <div className="col-sm col-lg-5 col-xl">
          <div className="col-xl-10 d-none d-md-block">
            <img src={logLogo} className="w-100" alt="login" />
          </div>
        </div>
        <div className="mt-4 col-sm col-lg-5 col-xl">
          <div className="mb-5">
            <h1 style={{ fontWeight: "600" }}>Login</h1>
          </div>

          {data?.message && (
            <div className="col-xl-8 p-3 alert alert-danger" role="alert">
              {data.message}
            </div>
          )}
          <form method="POST" className="col-xl-8">
            <div className="mb-3">
              <input
                type="email"
                className="form-control p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary p-2 w-100"
            >
              Login
            </button>
          </form>
          <div className="col-xl-8 text-center p-3">
            <p>
              Create a Account
              <NavLink to="/register" className="px-2">
                SingUp
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
