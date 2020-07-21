import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import NavBar from "./views/NavBar/NavBar";
import Auth from "../hoc/auth";
import VideoUploadPage from "./views/VideoUploadPage/VideoUploadPage";
import VideoDetailPage from "./views/VideoDetailPage/VideoDetailPage";
import SubscriptionPage from "./views/SubscriptionPage/SubscriptionPage";

const { Content, Footer } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <NavBar />
        <Content
          className="site-layout"
          style={{ padding: "0 50px", marginTop: 114 }}
        >
          <div
            className="site-layout-background"
            style={{
              display: "flex",
              justifyContent: "center",
              padding: 24,
              minHeight: "calc(100vh - 178px)",
              backgroundColor: "#fff"
            }}
          >
            <Switch>
              <Route exact path="/" component={Auth(LandingPage, null)} />
              <Route path="/register" component={Auth(RegisterPage, false)} />
              <Route path="/login" component={Auth(LoginPage, false)} />
              <Route
                path="/video/upload"
                component={Auth(VideoUploadPage, true)}
              />
              <Route
                path="/video/:videoId"
                component={Auth(VideoDetailPage, null)}
              />
              <Route
                path="/subscribe"
                component={Auth(SubscriptionPage, true)}
              />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          ©2020 Created by ZOE. https://github.com/h2jeong/youtube-clone-antd
        </Footer>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
