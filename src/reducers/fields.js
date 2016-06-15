import * as ActionTypes from '../constants/ActionTypes';
import field from './field';

const fields = (state = [], action) => {
    switch(action.type) {
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
