import React, { useState, useEffect } from "react";
import axios from "axios";

function Subscriber({ userTo, userFrom }) {
  const [Count, setCount] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const variable = { userTo, userFrom };

    axios.post("/api/subscribe/subscribed", variable).then(res => {
      if (res.data.success) {
        console.log(res.data, res.data.subscribed);
        setSubscribed(res.data.Subscribed);
      } else {
        alert("Failed to get Subscribed Result");
      }
    });

    axios.post("/api/subscribe/getCount", variable).then(res => {
      if (res.data.success) {
        // console.log(res.data);
        setCount(res.data.count);
      } else {
        alert("Failed to get subscribed number");
      }
    });
  }, []);

  const onSubscribe = () => {
    let variable = { userTo, userFrom };

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
    <button onClick={onSubscribe}>
      {Count} {Subscribed ? "Subscribed" : "Subscribe"}
    </button>
  );
}

export default Subscriber;
