import React, { useState, useEffect } from "react";
import axios from "axios";

function Subscriber({ userTo, userFrom }) {
  const [SubscribedNumber, setSubscribedNumber] = useState(0);

  useEffect(() => {
    const variable = { userTo };
    axios.post("/api/subscribe/subscribedNumber", variable).then(res => {
      if (res.data.success) {
        // console.log(res.data);
        setSubscribedNumber(res.data.count);
      } else {
        alert("Failed to get subscribed number");
      }
    });
  });

  const onSubscribe = () => {
    const variable = { userTo, userFrom };
    // console.log("variable:", variable);
    axios.post("/api/subscribe/subscribe", variable).then(res => {
      if (res.data.success) {
        // console.log(res.data);
      } else {
        alert("Failed to Subscribe");
      }
    });
  };
  return <button onClick={onSubscribe}>{SubscribedNumber} Subscribe</button>;
}

export default Subscriber;
