/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import {
    CURRENT_USER
  } from "../constants/user";
  
  import { API_TUNNELBATCHLIST } from "../constants/api";
  
  import { createAction } from "../utils/redux";
  
  export const dispatchCurrentUser = payload => {
    return createAction({
      url: API_TUNNELBATCHLIST,
      type: CURRENT_USER,
      payload
    });
  };
  