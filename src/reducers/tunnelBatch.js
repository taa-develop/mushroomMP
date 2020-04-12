import {
  TUNNELBATCHLIST,
  STAGETUNNELBATCHLIST,
  INDICATORSLIST,
  RECORDTUNNELBATCHLIST
} from "../constants/tunnelBatch";

const INITIAL_STATE = {
  list: []
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
    default:
      return state;
  }
}
