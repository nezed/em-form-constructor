import * as ActionTypes from '../constants/ActionTypes';

const createOption = ({optionId: id, name = ''}) => {
    return {id, name};
};
const option = (state, action) => {
    if(state === undefined) {
        state = createOption(action);
    }

    if(state.id !== action.optionId) {
        return state;
    }

    switch(action.type) {
        case ActionTypes.CHANGE_FIELD_OPTION_NAME:
            return {
                ...state,
                name: action.name
            };
        default:
            return state;
    }
};

export default option;
