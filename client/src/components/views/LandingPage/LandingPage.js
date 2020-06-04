import React, { useEffect } from "react";
import axios from "axios";

function LandingPage() {
  useEffect(() => {
    axios.get("/api/hello").then(res => console.log(res.data, res));
  }, []);
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
      <h2>시작 페이지</h2>
    </div>
  );
}

export default LandingPage;
