import { REGISTER_USER, LOGIN_USER, AUTH_USER } from "../_actions/user_actions";

export default function(state = {}, action) {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case LOGIN_USER:
      return { ...state, login: action.payload };
    case AUTH_USER:
      return { ...state, auth: action.payload };
    default:
      return state;
  }
}
