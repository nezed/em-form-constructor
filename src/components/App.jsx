import Aside from '../containers/Aside';
import Main from './Main';

import css from './App.css';

export default () => (
    <div className={ css.module }>
        <Aside className={ css.aside } />
        <Main className={ css.main } />
    </div>
);
