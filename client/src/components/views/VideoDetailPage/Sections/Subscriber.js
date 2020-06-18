import React, { useState, useEffect } from "react";
import axios from "axios";

function Subscriber({ userTo, userFrom }) {
  const [Count, setCount] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);
  const variable = { userTo, userFrom };
  console.log("variable", variable);
  useEffect(() => {
    axios.post("/api/subscribe/getCount", variable).then(res => {
      if (res.data.success) {
        // console.log(res.data);
        setCount(res.data.count);
      } else {
        alert("Failed to get subscribed number");
      }
    });
    let subscribedVariable = {
      userTo,
      userFrom: localStorage.getItem("UserId")
    };
    axios.post("/api/subscribe/subscribed", subscribedVariable).then(res => {
      if (res.data.success) {
        console.log(res.data, res.data.subscribed);
        setSubscribed(res.data.subscribed);
      } else {
        alert("Failed to get Subscribed Result");
      }
    });
  }, []);

  const onSubscribe = () => {
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
          alert("Failed to Subscribe");
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
        borderRadius: "2px",
        color: "#fff",
        padding: "10px 16px",
        fontWeight: "500",
        fontSize: "1rem",
        textTransform: "uppercase"
      }}
    >
      {Count} {Subscribed ? "Subscribed" : "Subscribe"}
    </button>
  );
}

export default Subscriber;
