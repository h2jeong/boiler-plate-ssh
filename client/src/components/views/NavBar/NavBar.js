import React from "react";
import { Layout, Menu } from "antd";
import RightMenu from "./RightMenu";
import "./NavBar.css";

const { Header } = Layout;

function NavBar() {
  return (
    <Header
      className="header"
      style={{ position: "fixed", zIndex: 1, width: "100%" }}
    >
      <div
        className="logo"
        style={{
          width: "120px",
          height: "31px",
          background: "rgba(255, 255, 255, 0.2)",
          margin: "16px 28px 16px 0",
          float: "left"
        }}
      />
      <Menu theme="dark" mode="horizontal" className="menu_header">
        <Menu.Item key="mail">
          <a href="/">Home</a>
        </Menu.Item>
        <Menu.Item key="subscription">Subscription</Menu.Item>
      </Menu>
      <RightMenu />
    </Header>
  );
}

export default NavBar;
