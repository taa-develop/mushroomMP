import { combineReducers } from "redux";
import counter from "./counter";
import tunnelBatch from "./tunnelBatch";

export default combineReducers({
  counter,
  tunnelBatch
});
