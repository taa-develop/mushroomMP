/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import {
  TUNNELBATCHLIST,
  TUNNELBATCH_ADD,
  STAGETUNNELBATCHLIST,
  TUNNELBATCH_RECORD_ADD,
  INDICATORSLIST,
  RECORDTUNNELBATCHLIST,
} from "../constants/tunnelBatch";

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
export const dispatchAddTunnelBatchRecord = payload => {
  return createAction({
    url: API_TUNNELBATCHLIST,
    method: "POST",
    type: TUNNELBATCH_RECORD_ADD,
    payload
  });
};


export const dispatchStageByTunnelBatchList = payload => {
  return createAction({
    url: API_TUNNELBATCHLIST,
    type: STAGETUNNELBATCHLIST,
    payload
  });
};
export const dispatchRecordByTunnelBatchList = payload => {
  return createAction({
    url: API_TUNNELBATCHLIST,
    type: RECORDTUNNELBATCHLIST,
    payload
  });
};

export const dispatchIndicatorsList = payload => {
  return createAction({
    url: API_TUNNELBATCHLIST,
    type: INDICATORSLIST,
    payload
  });
};
