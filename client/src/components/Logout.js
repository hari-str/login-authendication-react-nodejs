import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../App";
import { URL } from "../Url";

const Logout = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${URL}/api/logout`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: "USER", payload: res });
          navigate("/login", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <div>Logout</div>
    </div>
  );
};

export default Logout;
