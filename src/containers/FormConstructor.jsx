import FormValidate from '../components/FormValidate';
import InputConstructor from './InputConstructor';

import pure from 'pure-render-decorator';
import css from './FormConstructor.css';

@pure
class FormConstructor extends React.Component {
    static propTypes = {
        fields: React.PropTypes.array
    }

    state = {
        validationError: ''
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

    render() {
        const {fields} = this.props,
            {validationError} = this.state;

        return (
            <FormValidate className={ css.module } onValid={ this.onValid } onInvalid={ this.onInvalid }>
                <h2 className={ css.formTitle }>
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
                        null
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
                            fields.map((field) => (
                                <InputConstructor { ...this.props } field={ field } key={ field.id } />
                            ))
                        }
                    </tbody>
                </table>
            </FormValidate>
        );
    }
}


export default Utils.connect(
    ['fields', 'saved']
)(FormConstructor);
