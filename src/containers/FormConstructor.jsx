import FormValidate from '../components/FormValidate';
import Button from '../components/Button';
import InputConstructor from './InputConstructor';

import storage from 'local-storage-fallback';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import pure from 'pure-render-decorator';
import css from './FormConstructor.css';

@DragDropContext(HTML5Backend)
@pure
class FormConstructor extends React.Component {
    static contextTypes = {
        store: React.PropTypes.object
    }

    static propTypes = {
        fields: React.PropTypes.array,
        description: React.PropTypes.string,
        saved: React.PropTypes.bool,
        onSaveStatusChange: React.PropTypes.func
    }

    state = {
        validationError: ''
    }

    componentWillReceiveProps({saved, fields, description, onSaveStatusChange}) {
        if(saved && (
            this.props.fields !== fields || this.props.description !== description
        )) {
            onSaveStatusChange(false);
        }
    }

    onValid = () => {
        this.setState({
            validationError: ''
        });
    }

    onInvalid = (validationError) => {
        this.setState({
            validationError
        });
    }

    onSubmit = (event) => {
        event.preventDefault();

        this.props.onSaveStatusChange(true);
        storage.setItem('form', JSON.stringify(this.context.store.getState()));
    }

    render() {
        const {saved, fields, description} = this.props,
            {validationError} = this.state;

        return (
            <FormValidate
                className={ css.module }
                onValid={ this.onValid }
                onInvalid={ this.onInvalid }
                onSubmit={ this.onSubmit }
            >
                <h2 className={ css.formTitle }>
                    <div className={ css.saveBtn }>
                        <Button active={ !saved } highlighted type="submit">
                            Save form
                        </Button>
                    </div>
                    San Francisco Driver Form
                </h2>

                {
                    validationError ?
                        <div className={ css.validationMessage }>
                            {
                                validationError
                            }
                        </div>
                    :
                        <div className={ css.description } title="Description">
                            {
                                description
                            }
                        </div>
                }

                <table className={ css.inputConstructors }>
                    <tbody>
                        <tr className={ css.tableHeader }>
                            <th className={ css.colHeading }>
                                Question title
                            </th>
                            <th className={ css.colHeading }>
                                Choices
                            </th>
                            <th className={ css.colHeading }>
                                Required?
                            </th>
                        </tr>
                        {
                            fields.map((field, index) => (
                                <InputConstructor { ...this.props } field={ field } key={ field.id } index={ index } />
                            ))
                        }
                    </tbody>
                </table>
            </FormValidate>
        );
    }
}

import {SAVE_STATUS} from '../actions';

export default Utils.connect(
    ['fields', 'saved', 'description'],
    {
        onSaveStatusChange: SAVE_STATUS
    }
)(FormConstructor);
