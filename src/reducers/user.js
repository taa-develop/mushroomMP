import { CURRENT_USER } from "../constants/user";

const INITIAL_STATE = {
  userInfo: null
};

export default function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CURRENT_USER:
      return {
        ...state,
        userInfo: action.payload
      };
    default:
      return state;
  }
}
