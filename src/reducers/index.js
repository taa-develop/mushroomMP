import { combineReducers } from "redux";
import counter from "./counter";
import tunnelBatch from "./tunnelBatch";
import user from "./user";

export default combineReducers({
  counter,
  tunnelBatch,
  user,
});
