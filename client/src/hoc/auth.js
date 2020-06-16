import React, { useEffect } from "react";
// import axios from "axios";
import { useDispatch } from "react-redux";
import { authUser } from "../_actions/user_actions";

export default function(SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    // 백엔드에 유저의 상태를 가져온다.
    // option - null : 아무나 출입 가능, true : 로그인 유저만, false: 로그인 유저 불가능
    // adminRoute - null, true, false
    // 가져온 상태를 가지고 분기 처리를 해준다.
    // 로그인/로그아웃 ? 옵션 값 확인 ? 어드민 루트와 어드민 상태 확인
    const dispatch = useDispatch();

    useEffect(() => {
      // axios.get("/api/users/auth").then(res => {
      dispatch(authUser())
        .then(async res => {
          const { isAuth, isAdmin } = res.payload;
          console.log("res.payload:", res.payload);

          if (await !isAuth) {
            if (option) props.history.push("/login");
          } else {
            if (option === false) {
              props.history.push("/");
            }
            if (adminRoute && !isAdmin) {
              props.history.push("/");
            }
          }
        })
        .catch(err => {
          console.log("auth error:", err);
        });
    }, [props.history, dispatch]);

    return <SpecificComponent {...props} />;
  }

  return AuthenticationCheck;
}
