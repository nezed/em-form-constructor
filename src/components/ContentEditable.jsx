import pure from 'pure-render-decorator';
import debounce from 'debounce';
import cn from 'classnames';
import areEqual from 'fbjs/lib/areEqual';
import css from './ContentEditable.css';

const CHECKERS = {

    required: ({error = 'This field must be non-empty'}) => (
        Object.assign(
            (value) => !value.length && error,
            {
                attrs: {
                    required: true,
                    ['aria-required']: true
                }
            }
        )
    ),

    exclude: ({values = [], error = 'Illegal value "%s"'}) => (
        (value) => value && values.includes(value) && error
    )
};

/**
 * Because React doest not respect [contenteditable] attr
 */

@pure
export default class ContentEditable extends React.Component {

    static contextTypes = {
        bindInput: React.PropTypes.func.isRequired,
        unbindInput: React.PropTypes.func.isRequired,
        onValidation: React.PropTypes.func.isRequired
    }

    static propTypes = {
        children: React.PropTypes.string,
        editing: React.PropTypes.bool,
        onRemove: React.PropTypes.func,
        onChange: React.PropTypes.func,
        /**
         * @example `{required: true, min: 5, custom: (value, props) => has}`
         */
        rules: React.PropTypes.object
    }

    static defaultProps = {
        rules: {}
    }

    constructor({editing = false, rules}) {
        super(...arguments);

        this.state = {
            editing
        };

        this._parseRules(rules);
    }

    componentDidMount() {
        this.context.bindInput(this, this._isInvalid());
    }

    componentWillUnmount() {
        this.context.unbindInput(this);
    }

    _input = null

    _validators = []

    _parseRules(rules) {
        const _validators = this._validators = [];

        for(const rule of Object.keys(rules)) {
            if(CHECKERS.hasOwnProperty(rule)) {
                _validators.push(CHECKERS[rule](rules[rule]));
            } else if(rules[rule] instanceof Function) {
                _validators.push(rules[rule]());
            }
        }

    }

    _isInvalid() {
        const {children} = this.props,
            value = this._input ? this._input.value : children;

        for(const validator of this._validators) {
            const error = validator(value, this.props);

            if(error) {
                return error.replace(/\%s/g, value);
            }
        }
    }

    _validate() {
        return this.context.onValidation(this, this._isInvalid());
    }

    componentWillReceiveProps({editing = this.state.editing, rules}) {
        if(this.props.editing ^ editing) {
            this.setState({
                editing
            });
        }

        if(!areEqual(this.props.rules, rules)) {
            this._parseRules(rules);
            this._validate();
        }
    }

    inputRef = (input) => {
        this._input = input;

        if(!input) {
            return;
        }

        input.select();
    }

    onEdit = (event) => {
        event.preventDefault();

        this.setState({
            editing: true
        });
    }

    onSave = (event) => {
        const {onChange} = this.props,
            {value} = event.target;

        this._validate();
        event.preventDefault();

        this.setState({editing: false}, () => {
            if(onChange) {
                onChange(value);
            }
        });
    }

    onBlur = (event) => {
        this.onSave(event);
    }

    onChange = debounce(() => {
        this._validate();
    }, 1000)

//    Prevents navigation to next focusable element by hitting enter
//    and allow to save by esc key
    onKeyDown = (event) => {
        const {keyCode} = event;

        if(keyCode === 27 || keyCode === 13) {
            this.onSave(event);
        }
    }

    onRemove = (event) => {
        const {onRemove} = this.props;

        event.preventDefault();

        if(onRemove) {
            onRemove();
        }
    }

    render() {
        if(this.state.editing) {
            return this.renderEditor();
        } else {
            return this.renderContent();
        }
    }

    renderEditor() {
        const {children} = this.props;

        const attrs = {};
        this._validators.forEach((validator) => {
            if(validator.attrs) {
                Object.assign(attrs, validator.attrs);
            }
        });

        return (
            <div className={ css.module }>
                <div className={ css.editor }>
                    <input
                        { ...attrs }
                        className={ css.input }
                        type="text"
                        ref={ this.inputRef }
                        onBlur={ this.onBlur }
                        onChange={ this.onChange }
                        onKeyDown={ this.onKeyDown }
                        defaultValue={ children } />
                </div>
            </div>
        );
    }

    renderContent() {
        const {className, onRemove, children} = this.props;

        return (
            <div className={ css.module }>
                <div className={ cn(className, css.content) }>
                    {
                        children
                    }
                </div>
                <button className={ css.btnEdit } onClick={ this.onEdit }>
                    Edit
                </button>
                {
                    onRemove ?
                        <button className={ css.btnRemove } onClick={ this.onRemove }>
                            Remove
                        </button> :
                        null
                }
            </div>
        );
    }


}
