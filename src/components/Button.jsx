import css from './Button.css';
import cn from 'classnames';

export default (props) => {
    let {className = getClassName(props)} = props;

    return <button className={ className } {...props} />;
};

function getClassName(props) {
    const {active, inSet, disabled} = props;

    return cn(css.module, {
        [css.module_active]: active,
        [css.module_inSet]: inSet,
        [css.module_disabled]: disabled
    });
}
