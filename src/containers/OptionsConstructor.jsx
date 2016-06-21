import ContentEditable from '../components/ContentEditable';
import Input from '../components/Input';

import pure from 'pure-render-decorator';
import css from './OptionsConstructor.css';

@pure
class OptionsConstructor extends React.Component {

    static contextTypes = {
        bindInput: React.PropTypes.func.isRequired,
        unbindInput: React.PropTypes.func.isRequired,
        onValidation: React.PropTypes.func.isRequired
    }

    static propTypes = {
        field: React.PropTypes.object,
        type: React.PropTypes.oneOf([
            'INPUT',
            'TEXTAREA',
            'RADIO',
            'CHECKBOX',
            'SELECT',
            'FILE'
        ]),

        onAddFieldOption: React.PropTypes.func,
        onRemoveFieldOption: React.PropTypes.func,
        onChangeFieldOptionName: React.PropTypes.func
    }

    componentDidMount() {
        this.context.bindInput(this, this._isInvalid(this.props));
    }

    componentWillUnmount() {
        this.context.unbindInput(this);
    }

    _isInvalid(props) {
        const {values} = props.field;

        return !values.length && 'Choices must be non empty';
    }

    componentWillUpdate(nextProps) {
        if(this.props.field.values.length !== nextProps.field.values.length) {
            this.context.onValidation(this, this._isInvalid(nextProps));
        }
    }

    render() {
        const {type, field: {values, id}, onAddFieldOption, onRemoveFieldOption, onChangeFieldOptionName} = this.props;

        return (
            <div className={ css.module }>
                {
                    values.map((option) => (
                        <label className={ type === 'SELECT' ? css.selectOption : css.option } key={ option.id }>
                            {
                                type !== 'SELECT' ?
                                    <Input type={type} name={ id } disabled />
                                :
                                    null
                            }
                            <div className={ css.name }>
                                <ContentEditable
                                    editing={ !option.name }
                                    rules={ {
                                        required: {
                                            error: 'Choice title cant be empty'
                                        },
                                        exclude: {
                                            values: values.filter((o) => o.id !== option.id).map((o) => o.name),
                                            error: 'Dublicate choices with title "%s"'
                                        }
                                    } }
                                    onRemove={ () => onRemoveFieldOption(id, option.id) }
                                    onChange={ (value) => onChangeFieldOptionName(id, option.id, value) }
                                >
                                    {
                                        option.name
                                    }
                                </ContentEditable>
                            </div>
                        </label>
                    ))
                }
                <button className={ css.addOption } onClick={ (event) => {
                    event.preventDefault();
                    onAddFieldOption(id);
                } }>
                    + Add Choice
                </button>
            </div>
        );
    }
}

import {ADD_FIELD_OPTION, REMOVE_FIELD_OPTION, CHANGE_FIELD_OPTION_NAME} from '../actions';

export default Utils.connect(null, {
    onAddFieldOption: ADD_FIELD_OPTION,
    onRemoveFieldOption: REMOVE_FIELD_OPTION,
    onChangeFieldOptionName: CHANGE_FIELD_OPTION_NAME
})(OptionsConstructor);
