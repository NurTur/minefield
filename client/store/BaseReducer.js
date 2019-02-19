import { combineReducers } from "redux";
import Reducer from "./reducers/reducer";
import User from "./reducers/user";
import Records from "./reducers/records";
import StateSaver from "./reducers/stateSaver";

const BaseReducer = combineReducers({ Reducer, User, Records, StateSaver });

export default BaseReducer;
