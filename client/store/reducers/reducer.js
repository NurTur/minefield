import { DATAOFFIELD } from "../actions/field";

const InitalState = { Mine: 0, Move: 0, Timer: "STOP", Count: "10", Second: 0 };

export default function Reducer(state = InitalState, action) {
  switch (action.type) {
    case DATAOFFIELD: return Object.assign({}, state, action.payload);
    default: return state;
  }
}


