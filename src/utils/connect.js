import {bindActionCreators} from 'redux';
import {connect as _connect} from 'react-redux';

/**
 * Automaticly connects specified state props
 * and wraps actionCreators into `dispatch`
 *
 * @param {array} props Array of nedded state properties
 * @param {object} actionCreators Object of `propName: actionCreator`
 * @returns {function} React component connector decorator
 */
export const connect = (props, actionCreators) => {
    return _connect(
        (storeProps) => {
            const connectedProps = {};

            if(!props) {
                return connectedProps;
            }

            for(const key of props) {
                connectedProps[key] = storeProps[key];
            }
            return connectedProps;
        },
        actionCreators && ((dispatch) => bindActionCreators(actionCreators, dispatch))
    );
};
