import { RECORDSDATA } from "../actions/records";
import propTypes from 'prop-types';
import WithPropTypes from "./withPropTypes";

const InitalState = [];
function Records(state = InitalState, action) {
    switch (action.type) {
        case RECORDSDATA: return action.payload;
        default: return state;
    }
}

const ItemSchema = {
    name: propTypes.string.isRequired,
    answer: propTypes.number.isRequired,
}

const ReducerSchema = propTypes.arrayOf(
    propTypes.shape(ItemSchema).isRequired
).isRequired;


export default WithPropTypes(
    'Records',
    ReducerSchema,
)(Records)