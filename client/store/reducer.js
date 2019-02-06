import { MINECOUNT, MOVECOUNT, TIMER } from "./actions";

const InitalState = { Mine: 0, Move: 0, Timer: "STOP" };

export default function Reducer(state = InitalState, action) {
  switch (action.type) {
    case MINECOUNT:
      return Object.assign({}, state, action.payload);
    case MOVECOUNT:
      return Object.assign({}, state, action.payload);
    case TIMER:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}


