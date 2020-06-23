import React from "react";
import { Menu } from "antd";
import "./NavBar.css";
import { UploadOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../_actions/user_actions";

function RightMenu(props) {
  const authUser = useSelector(state => state.user.auth);
  const dispatch = useDispatch();

  // console.log("isAuth:", authUser);
  const handleLogout = () => {
    dispatch(logoutUser()).then(res => {
      if (res.payload.success) {
        localStorage.removeItem("userId");
        props.history.push("/");
      } else {
        alert("Failed to Logout");
      }
    });
  };

  if (authUser && !authUser.isAuth) {
    return (
      <Menu theme="dark" mode="horizontal" className="menu_header menu_user">
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu theme="dark" mode="horizontal" className="menu_header menu_user">
        <Menu.Item key="create">
          <a href="/video/upload">
            <UploadOutlined />
          </a>
        </Menu.Item>
        <Menu.Item key="app">
          <span onClick={handleLogout}>Signout</span>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
