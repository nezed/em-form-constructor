import * as ActionTypes from '../constants/ActionTypes';
import field from './field';

const swap = (state, item, at) => {
    const itemIndex = state.indexOf(item),
        newState = state.slice(0);

    if(!~itemIndex) {
        return state;
    }

    newState.splice(itemIndex, 1);

    const atIndex = newState.indexOf(at),
        isLocatedBefore = itemIndex <= atIndex;

    if(~atIndex) {
        newState.splice(atIndex + isLocatedBefore, 0, item);
    } else {
        newState.push(item);
    }

    return newState;
};

const fields = (state = [], action) => {
    switch(action.type) {
        case ActionTypes.SWAP_FIELDS:
            return swap(state, action.field, action.at);
        case ActionTypes.ADD_FIELD:
            return [
                ...state,
                field(undefined, {
                    ...action,
                    id: 1 + state.reduce((max, current) => current.id > max ? current.id : max, 0)
                })
            ];
        case ActionTypes.REMOVE_FIELD:
            return state.filter((f) => f.id !== action.id);
        case ActionTypes.CHANGE_FIELD_NAME:
        case ActionTypes.TOGGLE_FIELD_REQUIRED:
        case ActionTypes.ADD_FIELD_OPTION:
        case ActionTypes.REMOVE_FIELD_OPTION:
        case ActionTypes.CHANGE_FIELD_OPTION_NAME:
            return state.map((f) => field(f, action));
        default:
            return state;
    }
};

export default fields;
