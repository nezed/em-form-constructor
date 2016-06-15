import {combineReducers} from 'redux';
import saved from './saved';
import description from './description';
import fields from './fields';

const rootReducer = combineReducers({
    saved,
    description,
    fields
});

export default rootReducer;
