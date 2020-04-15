import {
  TUNNELBATCHLIST,
  STAGETUNNELBATCHLIST,
  INDICATORSLIST,
  RECORDTUNNELBATCHLIST,
  SAVE_TUNNEL_NUMBER
} from "../constants/tunnelBatch";

const INITIAL_STATE = {
  list: [],
  tunnelData: {}
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
    default:
      return state;
  }
}
