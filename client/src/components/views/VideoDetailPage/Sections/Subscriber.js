import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

function Subscriber(props) {
  const [Count, setCount] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);
  const { userTo, userFrom } = props;
  const variable = { userTo, userFrom };
  // console.log("variable", variable);

  useEffect(() => {
    axios.post("/api/subscribe/getCount", variable).then(res => {
      if (res.data.success) {
        // console.log(res.data);
        setCount(res.data.count);
      } else {
        alert("Failed to get subscribed number");
      }
    });
  }, []);

  useEffect(() => {
    // console.log("userFrom:", localStorage.getItem("UserId"));
    // let subscribedVariable = {
    //   userTo,
    //   userFrom: localStorage.getItem("UserId")
    // };
    // console.log("subscribedVariable", subscribedVariable);
    axios.post("/api/subscribe/subscribed", variable).then(res => {
      if (res.data.success) {
        // console.log("subscribed:", res.data, res.data.subscribed);
        setSubscribed(res.data.subscribed);
      } else {
        alert("Failed to get Subscribed Result");
      }
    });
  }, []);

  const onSubscribe = () => {
    if (userFrom === null) {
      alert("Subsrcibe is available after login");
      props.history.push("/login");
    }
    if (Subscribed) {
      axios.post("/api/subscribe/unSubscribe", variable).then(res => {
        if (res.data.success) {
          // console.log(res.data);
          setCount(Count - 1);
          setSubscribed(!Subscribed);
        } else {
          alert("Failed to Subscribe");
        }
      });
    } else {
      axios.post("/api/subscribe/subscribe", variable).then(res => {
        if (res.data.success) {
          // console.log(res.data);
          setCount(Count + 1);
          setSubscribed(!Subscribed);
        } else {
          alert("Failed to Subscribe", res.data.err);
        }
      });
    }
  };
  return (
    <button
      onClick={onSubscribe}
      style={{
        backgroundColor: `${Subscribed ? "#aaaaaa" : "#cc0000"}`,
        borderWidth: 0,
        borderRadius: "3px",
        color: "#fff",
        padding: "10px 16px",
        fontWeight: "500",
        fontSize: "0.9rem",
        textTransform: "uppercase"
      }}
    >
      {Count} {Subscribed ? "Subscribed" : "Subscribe"}
    </button>
  );
}

export default withRouter(Subscriber);
