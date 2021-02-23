import { combineEpics } from "redux-observable";
import { combineReducers } from "redux";
import * as reducers from "../redux/reducers";
import * as epics from "../redux/epics";

export const rootEpic = combineEpics(...epics);

export const rootReducer = combineReducers({
  ...reducers,
});
