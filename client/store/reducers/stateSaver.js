import { STATES } from "../actions/stateSaver";
import propTypes from 'prop-types';
import WithPropTypes from "./withPropTypes";

const InitalState = { cells: [], EncryptCells: [] };

function StateSaver(state = InitalState, action) {
    switch (action.type) {
        case STATES: return Object.assign({}, state, action.payload);
        default: return state;
    }
}

const ItemSchema = {
    cells: propTypes.arrayOf(
        propTypes.arrayOf(propTypes.shape({
            status: propTypes.string,
            flag: propTypes.bool
        }))),
    EncryptCells: propTypes.arrayOf(
        propTypes.array),
}

const StateSaverSchema = propTypes.shape(ItemSchema);

export default WithPropTypes(
    'StateSaver',
    StateSaverSchema,
)(StateSaver)


