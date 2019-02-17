import { combineReducers } from "redux";
import Reducer from "./reducers/reducer";
import User from "./reducers/user";
import Records from "./reducers/records";

const BaseReducer = combineReducers({ Reducer, User, Records });

export default BaseReducer;
