import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import logLogo from "../images/loginimg.jpg";

const Login = () => {
  const url = "http://localhost:5000";
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);

  const loginClick = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch(`${url}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await res.json();
      console.log(data);
      setData(data);

      if (res.status === 200) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const googleLogin = async () => {
    try {
      await auth.signInWithPopup(googleProvider);
      setUser(await auth.currentUser);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(user);
  return (
    <section className="container pt-3 pb-4">
      <div className="row align-items-center justify-content-center ">
        <div className="col-sm col-lg-5 col-xl">
          <div className="col-xl-10 d-none d-md-block">
            <img src={logLogo} className="w-100" alt="login" />
          </div>
        </div>
        <div className="mt-4 col-sm col-lg-5 col-xl">
          <div className="mb-5">
            <h1 style={{ fontWeight: "600" }}>Login</h1>
          </div>

          {data.message && (
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
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <button
              type="submit"
              onClick={loginClick}
              className="btn btn-primary p-2 w-100"
            >
              Login
            </button>
          </form>
          <button
            type="button"
            onClick={googleLogin}
            className="btn mt-3 btn-outline-secondary"
          >
            Login with Google
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;
