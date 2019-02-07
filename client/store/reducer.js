import { MINECOUNT, MOVECOUNT, TIMER, COUNTMINE, BASIC } from "./actions";

const InitalState = { Mine: 0, Move: 0, Timer: "STOP", Count: "10" };

export default function Reducer(state = InitalState, action) {
  switch (action.type) {
    case MINECOUNT:
      return Object.assign({}, state, action.payload);
    case MOVECOUNT:
      return Object.assign({}, state, action.payload);
    case TIMER:
      return Object.assign({}, state, action.payload);
    case COUNTMINE:
      return Object.assign({}, state, action.payload);
    case BASIC:
      return Object.assign({}, state, { Mine: 0, Move: 0, Timer: "STOP" });
    default:
      return state;
  }
}


