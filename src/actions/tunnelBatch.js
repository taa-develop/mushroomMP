/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import {
  TUNNELBATCHLIST,
  TUNNELBATCH_ADD,
  STAGETUNNELBATCHLIST,
  TUNNELBATCH_RECORD_ADD,
  INDICATORSLIST,
  RECORDTUNNELBATCHLIST,
  TUNNELBATCH_COMPLETE_STAGE,
  TUNNELBATCH_START_STAGE,
  SAVE_TUNNEL_NUMBER,
  SAVE_TUNNEL_BATCH_ID,
  SAVE_TUNNEL_BATCHID_AND_STAGEID
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
export const dispatchCompleteStage = payload => {
  return createAction({
    url: API_TUNNELBATCHLIST,
    method: "POST",
    type: TUNNELBATCH_COMPLETE_STAGE,
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
export const dispatchTunnelBatchStageStart = payload => {
  return createAction({
    url: API_TUNNELBATCHLIST,
    method: "POST",
    type: TUNNELBATCH_START_STAGE,
    payload
  });
};

export const onTunnelNumberOftunnels = payload => {
  return {
    type: SAVE_TUNNEL_NUMBER,
    payload
  };
};
export const onTunnelBatchId = payload => {
  return {
    type: SAVE_TUNNEL_BATCH_ID,
    payload
  };
};
export const onTunnelBatchIdAndStageId = payload => {
  return {
    type: SAVE_TUNNEL_BATCHID_AND_STAGEID,
    payload
  };
};
