import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import axios from "axios";
import logLogo from "../images/loginimg.jpg";
import googleIcon from "../images/google-icon.png";

const Login = () => {
  const url = "http://localhost:5000";
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  // const [user, setUser] = useState(null);

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        `${url}/api/login`,
        { email: email, password: password },
        config
      );

      console.log(res);
      setData(res);

      if (res.status === 200) {
        navigate("/");
      }
    } catch (err) {
      console.log(err.response.data);
      setData(err.response.data);
    }
    // console.log(data);
  }

  const googleLogin = async () => {
    try {
      await auth.signInWithPopup(googleProvider);
      // await auth.signInWithRedirect(googleProvider);
      setData(await auth.currentUser);
    } catch (err) {
      console.log(err);
    }

    if (data) {
      navigate("/");
    }
  };

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

          <p className="text-center mt-2 col-xl-8">OR</p>
          <div className="google-button col-xl-8" onClick={googleLogin}>
            <img src={googleIcon} alt="googleIcon" />
            <button type="button" className="google-btn">
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
