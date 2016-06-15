import * as ActionTypes from '../constants/ActionTypes';

const saved = (state = true, action) => {
    switch(action.type) {
        case ActionTypes.SAVE_STATUS:
            return action.status;
        default:
            return state;
    }
};

export default saved;
