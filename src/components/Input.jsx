import Button from './Button';
import css from './Input.css';

const Input = (props) => {
    let {type = 'text'} = props;
    type = type.toLowerCase();

    switch(type) {
        case 'radio':
        case 'checkbox':
            return (
                <span {...props} className={ css.wrapper }>
                    <input {...props} className={ css[type] } />
                    <span className={ css.customView } />
                </span>
            );
        case 'textarea':
            return (
                <textarea {...props} className={ css.textarea } />
            );
        case 'file':
            return (
                <span {...props} className={ css.wrapper }>
                    <input {...props} className={ css[type] } />
                    <Button disabled={ props.disabled }>
                        Choose file
                    </Button>
                </span>
            );
        default:
            return (
                <input {...props} className={ css[type] } type={ type } />
            );
    }
};

Input.propTypes = {
    type: React.PropTypes.oneOf([
        'INPUT',
        'TEXTAREA',
        'RADIO',
        'CHECKBOX',
        'FILE'
    ])
};

export default Input;

