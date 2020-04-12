/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { TUNNELBATCHLIST, TUNNELBATCH_ADD } from "../constants/tunnelBatch";

import { API_TUNNELBATCHLIST } from "../constants/api";

import { createAction } from "../utils/redux";

export const dispatchTunnelBatchList = payload => {
  return createAction({
    url: API_TUNNELBATCHLIST,
    type: TUNNELBATCHLIST,
    payload
  });
};
export const dispatchAddTunnelBatch = payload => {
  return createAction({
    url: API_TUNNELBATCHLIST,
    method: "POST",
    type: TUNNELBATCH_ADD,
    payload
  });
};
