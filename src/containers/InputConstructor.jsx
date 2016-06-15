import ContentEditable from '../components/ContentEditable';
import OptionsConstructor from './OptionsConstructor';
import Input from '../components/Input';

import * as FieldTypes from '../constants/FieldTypes';

import pure from 'pure-render-decorator';
import css from './InputConstructor.css';

@pure
class InputConstructor extends React.Component {
    static propTypes = {
        field: React.PropTypes.object,
        fields: React.PropTypes.array,

        onRemoveField: React.PropTypes.func,
        onChangeFieldName: React.PropTypes.func,
        onToggleFieldRequired: React.PropTypes.func
    }

    render() {
        const {field, fields, onRemoveField, onChangeFieldName, onToggleFieldRequired} = this.props,
            {id, name, type, isRequired} = field;

        return (
            <tr className={ css.module }>
                <td className={ css.colName }>
                    <ContentEditable
                        editing
                        className={ isRequired ? css.fieldRequired : null }
                        rules={ {
                            required: {
                                error: 'Question title cant be empty'
                            },
                            exclude: {
                                values: fields.filter((f) => f.id !== id).map((f) => f.name),
                                error: 'Dublicate fields with title "%s"'
                            }
                        } }
                        onChange={ (value) => {
                            onChangeFieldName(id, value);
                        }}
                    >
                        {
                            name
                        }
                    </ContentEditable>
                </td>
                <td className={ css.colChoices }>
                    {
                        type === 'RADIO' &&
                            <OptionsConstructor type="RADIO" field={ field } /> ||
                        type === 'CHECKBOX' &&
                            <OptionsConstructor type="CHECKBOX" field={ field } /> ||
                        type === 'SELECT' &&
                            <OptionsConstructor type="SELECT" field={ field } /> ||
                            <Input type={ type } placeholder={ FieldTypes[type] } disabled />
                    }
                </td>
                <td className={ css.colRequired }>
                    <Input type="CHECKBOX" checked={isRequired} onClick={ (event) => {
                        event.preventDefault();
                        onToggleFieldRequired(id);
                    } } />
                </td>
                <td className={ css.col }>
                    <button className={ css.remove } onClick={ (event) => {
                        event.preventDefault();
                        onRemoveField(id);
                    } } >
                        Remove
                    </button>
                </td>

            </tr>
        );
    }
}

import {REMOVE_FIELD, CHANGE_FIELD_NAME, TOGGLE_FIELD_REQUIRED} from '../actions';

export default Utils.connect(null, {
    onRemoveField: REMOVE_FIELD,
    onChangeFieldName: CHANGE_FIELD_NAME,
    onToggleFieldRequired: TOGGLE_FIELD_REQUIRED
})(InputConstructor);
