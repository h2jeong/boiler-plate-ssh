import React, { useEffect } from "react";
// import Axios from "axios";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_actions";

export default function(SpecificComponent, option, adminRoute = null) {
  // option = null(아무나 출입가능)) || true(로그인한 유저 출입가능) || false(로그인한 유저 출입 불가)

  function AuthenticationCheck(props) {
    const dispatch = useDispatch();

    useEffect(() => {
      // Axios.get("/api/users/auth");
      dispatch(auth()).then(res => {
        console.log("auth::", res.payload);
        // 로그인 하지 않은 상태
        if (!res.payload.isAuth) {
          if (option) {
            props.history.push("/login");
          }
        } else {
          // 로그인한 상태
          if (adminRoute && !res.payload.isAdmin) {
            props.history.push("/");
          } else {
            if (option === false) {
              props.history.push("/");
            }
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
