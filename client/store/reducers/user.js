import { USER } from "../actions/user";

const InitalState = { name: "", id: "" };

export default function User(state = InitalState, action) {
    switch (action.type) {
        case USER: return Object.assign({}, state, action.payload);
        default: return state;
    }
}
