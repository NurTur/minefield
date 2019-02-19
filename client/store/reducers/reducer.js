import { DATAOFFIELD } from "../actions/field";
import propTypes from 'prop-types';
import withPropTypes from "./withPropTypes";

const InitalState = { Mine: 0, Move: 0, Timer: "STOP", Count: "10", Second: 0 };
function Reducer(state = InitalState, action) {
  switch (action.type) {
    case DATAOFFIELD: return Object.assign({}, state, action.payload);
    default: return state;
  }
}

const ItemSchema = {
  Mine: propTypes.number.isRequired,
  Move: propTypes.number.isRequired,
  Timer: propTypes.string.isRequired,
  Count: propTypes.string.isRequired,
  Second: propTypes.number.isRequired,
}


const ReducerSchema = propTypes.shape(ItemSchema).isRequired;

export default withPropTypes(
  'Reducer',
  ReducerSchema,
)(Reducer)


