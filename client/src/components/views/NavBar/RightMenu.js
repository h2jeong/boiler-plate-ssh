import React from "react";
import { Menu } from "antd";
import "./NavBar.css";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

function RightMenu(props) {
  const authUser = useSelector(state => state.user.auth);
  // console.log("isAuth:", authUser);
  const handleLogout = () => {
    axios.post("/api/users/logout").then(res => {
      if (res.data.success) {
        props.history.push("/login");
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
