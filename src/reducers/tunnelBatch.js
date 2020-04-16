import {
  TUNNELBATCHLIST,
  STAGETUNNELBATCHLIST,
  INDICATORSLIST,
  RECORDTUNNELBATCHLIST,
  SAVE_TUNNEL_NUMBER,
  SAVE_TUNNEL_BATCH_ID,
  SAVE_TUNNEL_BATCHID_AND_STAGEID
} from "../constants/tunnelBatch";

const INITIAL_STATE = {
  list: [],
  tunnelData: {},
  batchId: "",
  batchIdAndStageId:{}
};

export default function tunnelBatch(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TUNNELBATCHLIST:
      return {
        ...state,
        list: action.payload
      };
    case STAGETUNNELBATCHLIST:
      return {
        ...state,
        list: action.payload
      };
    case INDICATORSLIST:
      return {
        ...state,
        list: action.payload
      };
    case RECORDTUNNELBATCHLIST:
      return {
        ...state,
        list: action.payload
      };
    case SAVE_TUNNEL_NUMBER:
      return {
        tunnelData: action.payload
      };
    case SAVE_TUNNEL_BATCH_ID:
      return {
        batchId: action.payload
      };
    case SAVE_TUNNEL_BATCHID_AND_STAGEID:
      return {
        batchIdAndStageId: action.payload
      };
    default:
      return state;
  }
}
