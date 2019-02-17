import { RECORDSDATA } from "../actions/records";

const InitalState = [];

export default function Records(state = InitalState, action) {
    switch (action.type) {
        case RECORDSDATA: return action.payload;
        default: return state;
    }
}
