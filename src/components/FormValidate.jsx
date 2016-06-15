export default class FormValidate extends React.Component {
    static childContextTypes = {
        bindInput: React.PropTypes.func.isRequired,
        unbindInput: React.PropTypes.func.isRequired,
        onValidation: React.PropTypes.func.isRequired
    }

    static propTypes = {
        onValid: React.PropTypes.func,
        onInvalid: React.PropTypes.func,
        onSubmit: React.PropTypes.func
    }

    _valid = true
    _inputs = []
    _validationErrors = []
    _allowNativeSubmit = false

    getChildContext() {
        return {
            bindInput: this.bindInput,
            unbindInput: this.unbindInput,
            onValidation: this.onValidation
        };
    }

    bindInput = (input, err) => {
        this._inputs.push(input);
        this._validationErrors.push(err);

        if(err) {
            this._valid = false;
        }
    }

    unbindInput = (input) => {
        const index = this._inputs.indexOf(input);

        if(!~index) {
            return;
        }

        this._inputs.splice(index, 1);
        this._validationErrors.splice(index, 1);
        this.checkFormValidity();
    }

    onValidation = (input, err) => {
        const {_valid} = this,
            {onValid, onInvalid} = this.props,
            index = this._inputs.indexOf(input);

        if(!~index) {
            return;
        }

        this._validationErrors[index] = err;

        if(!err && !_valid && onValid) {
            onValid();
        }

        if(err && onInvalid) {
            onInvalid(err);
        }
    }

    checkFormValidity() {
        const {_valid, _validationErrors} = this,
            {onValid, onInvalid} = this.props,
            errors = _validationErrors.filter((err) => Boolean(err)),
            valid = !errors.length;

        if(valid && !_valid && onValid) {
            onValid();
        }

        if(!valid && onInvalid) {
            onInvalid(errors[0]);
        }

        this._valid = valid;
    }

    onSubmit = (event) => {
        const {onSubmit} = this.props;

        event.preventDefault();

        this.checkFormValidity();

        if(this._valid && onSubmit) {
            return onSubmit(event);
        }
    }

    render() {
        return (
            <form action="" {...this.props} onSubmit={ this.onSubmit }>
                {
                    this.props.children
                }
            </form>
        );
    }
}
