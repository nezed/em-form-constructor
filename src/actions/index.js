import * as ActionTypes from '../constants/ActionTypes';

export function SWAP_FIELDS(field, at) {
    return {
        type: ActionTypes.SWAP_FIELDS,
        field,
        at
    };
}
export function ADD_FIELD(fieldType) {
    return {
        type: ActionTypes.ADD_FIELD,
        fieldType
    };
}
export function REMOVE_FIELD(id) {
    return {
        type: ActionTypes.REMOVE_FIELD,
        id
    };
}
export function CHANGE_FIELD_NAME(id, name) {
    return {
        type: ActionTypes.CHANGE_FIELD_NAME,
        id,
        name
    };
}
export function TOGGLE_FIELD_REQUIRED(id) {
    return {
        type: ActionTypes.TOGGLE_FIELD_REQUIRED,
        id
    };
}

export function ADD_FIELD_OPTION(id) {
    return {
        type: ActionTypes.ADD_FIELD_OPTION,
        id
    };
}
export function REMOVE_FIELD_OPTION(id, optionId) {
    return {
        type: ActionTypes.REMOVE_FIELD_OPTION,
        id,
        optionId
    };
}
export function CHANGE_FIELD_OPTION_NAME(id, optionId, name) {
    return {
        type: ActionTypes.CHANGE_FIELD_OPTION_NAME,
        id,
        optionId,
        name
    };
}

export function CHANGE_DESCRIPTION(description) {
    return {
        type: ActionTypes.CHANGE_DESCRIPTION,
        description
    };
}
export function SAVE_STATUS(status) {
    return {
        type: ActionTypes.SAVE_STATUS,
        status
    };
}
