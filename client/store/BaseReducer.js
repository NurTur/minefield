import { combineReducers } from "redux";
import Reducer from "./reducers/reducer";
import User from "./reducers/user";

const BaseReducer = combineReducers({ Reducer, User });

export default BaseReducer;
