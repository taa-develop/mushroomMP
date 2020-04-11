/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { TUNNELBATCHLIST } from "../constants/tunnelBatch";

import { API_TUNNELBATCHLIST } from "../constants/api";

import { createAction } from "../utils/redux";

export const dispatchTunnelBatchList = payload => {
  return createAction({
    url: API_TUNNELBATCHLIST,
    type: TUNNELBATCHLIST,
    payload
  });
};
