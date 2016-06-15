import {Tabs, TabsList, TabsPane} from '../components/Tabs';
import Button from '../components/Button';

import {ADD_FIELD, CHANGE_DESCRIPTION} from '../actions';
import * as FieldTypes from '../constants/FieldTypes';

import css from './Aside.css';

const Aside = ({className, description, onAddField, onChangeDescription}) => (
    <aside className={ className }>
        <h1 className={ css.heading }>
            San Francisco Driver Form
        </h1>
        <Tabs>
            <TabsList>
                <div className={ css.tab }>
                    Custom fields
                </div>
                <div className={ css.tab }>
                    Description (Optional)
                </div>
            </TabsList>

            <TabsPane>
                <form className={ css.tabPane }>
                    <legend className={ css.tip }>
                        Select fields will be added to form.
                    </legend>
                    <h2 className={ css.tabTitle }>
                        Add Custom Field
                    </h2>
                    <div className={ css.buttonsSet }>
                        {
                            Object.keys(FieldTypes).map((type) => (
                                <Button
                                    inSet
                                    key={ type }
                                    onClick={ (event) => {
                                        event.preventDefault();
                                        onAddField(type);
                                    } }
                                >
                                    {
                                        FieldTypes[type]
                                    }
                                </Button>
                            ))
                        }
                    </div>
                </form>

                <form className={ css.tabPane }>
                    <legend className={ css.tip }>
                        Optional form description.
                    </legend>
                    <h2 className={ css.tabTitle }>
                        Form Description
                    </h2>
                    <textarea className={ css.description } defaultValue={ description } onChange={ (event) => {
                        event.preventDefault();
                        onChangeDescription(event.target.value);
                    } } />
                </form>
            </TabsPane>
        </Tabs>

    </aside>
);

Aside.propTypes = {
    description: React.PropTypes.string,
    onAddField: React.PropTypes.func,
    onChangeDescription: React.PropTypes.func
};

export default Utils.connect(
    ['description'],
    {
        onAddField: ADD_FIELD,
        onChangeDescription: CHANGE_DESCRIPTION
    }
)(Aside);
