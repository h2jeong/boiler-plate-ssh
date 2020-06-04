import React, { useState } from "react";
// import Axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";

function LoginPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = e => {
    setEmail(e.currentTarget.value);
  };
  const onPasswordHandler = e => {
    setPassword(e.currentTarget.value);
  };
  const onSubmitHandler = e => {
    e.preventDefault();
    console.log("email", Email, "password", Password);

    let body = { email: Email, password: Password };

    dispatch(loginUser(body)).then(res => {
      if (res.payload.loginSuccess) {
        props.history.push("/");
      } else {
        alert("Error");
      }
    });
    // Axios.post("/api/users/login", body).then(res => {});
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignContent: "center",
        height: "100vh"
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column"
        }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
