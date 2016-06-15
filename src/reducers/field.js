import * as ActionTypes from '../constants/ActionTypes';
import * as FieldTypes from '../constants/FieldTypes';
import option from './option';

const createField = ({id, fieldType: type = FieldTypes.INPUT, name = '', isRequired = false, values = []}) => {
    return {id, type, name, isRequired, values};
};

const field = (state, action) => {
    if(state === undefined) {
        state = createField(action);
    }

    if(state.id !== action.id) {
        return state;
    }

    switch(action.type) {
        case ActionTypes.CHANGE_FIELD_NAME:
            return {
                ...state,
                name: action.name
            };
        case ActionTypes.TOGGLE_FIELD_REQUIRED:
            return {
                ...state,
                isRequired: !state.isRequired
            };
        case ActionTypes.ADD_FIELD_OPTION:
            return {
                ...state,
                values: [
                    ...state.values,
                    option(undefined, {
                        ...action,
                        optionId: 1 + state.values.reduce((max, current) => current.id > max ? current.id : max, 0)
                    })
                ]
            };
        case ActionTypes.REMOVE_FIELD_OPTION:
            return {
                ...state,
                values: state.values.filter((v) => v.id !== action.optionId)
            };
        case ActionTypes.CHANGE_FIELD_OPTION_NAME:
            return {
                ...state,
                values: state.values.map((v) => option(v, action))
            };
        default:
            return state;
    }
};

export default field;
