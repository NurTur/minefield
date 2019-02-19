import { USER } from "../actions/user";
import propTypes from 'prop-types';
import WithPropTypes from "./withPropTypes";

const InitalState = { username: "", _id: "X" };
function User(state = InitalState, action) {
    switch (action.type) {
        case USER: return Object.assign({}, state, action.payload);
        default: return state;
    }
};

const ItemSchema = {
    username: propTypes.string.isRequired,
    _id: propTypes.string.isRequired,
}

const UserSchema = propTypes.shape(ItemSchema).isRequired;

export default WithPropTypes(
    'User',
    UserSchema,
)(User)
