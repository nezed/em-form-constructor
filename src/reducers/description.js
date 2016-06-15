import * as ActionTypes from '../constants/ActionTypes';

const description = (state = '', action) => {
    switch(action.type) {
        case ActionTypes.CHANGE_DESCRIPTION:
            return action.description;
        default:
            return state;
    }
};

export default description;
