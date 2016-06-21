import {DragSource, DropTarget} from 'react-dnd';
import ContentEditable from '../components/ContentEditable';
import OptionsConstructor from './OptionsConstructor';
import Input from '../components/Input';

import * as FieldTypes from '../constants/FieldTypes';

import pure from 'pure-render-decorator';
import css from './InputConstructor.css';

const dragSource = {
    beginDrag({field, index}) {
        return {field, index};
    }
};
const dropTarget = {
    hover: ({field, index, onSwapFields}, monitor, component) => {
        const dragging = monitor.getItem();

        if(!dragging || dragging.field === field) {
            return;
        }

//        Hovered item bound rect
        const hoverBoundingRect = ReactDOM.findDOMNode(component).getBoundingClientRect(),
//              and its center
            hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

//        Mouse position
        const clientOffset = monitor.getClientOffset(),
//              Mouse position relative to the item
            hoverClientY = clientOffset.y - hoverBoundingRect.top;

        if(
            dragging.index < index && hoverClientY < hoverMiddleY ||
            dragging.index > index && hoverClientY > hoverMiddleY
        ) {
            return;
        }

        onSwapFields(dragging.field, field);
        dragging.index = index;
    }
};

@DragSource(
    'field',
    dragSource,
    (connect) => ({
        connectDragSource: connect.dragSource()
    })
)
@DropTarget(
    'field',
    dropTarget,
    (connect) => ({
        connectDropTarget: connect.dropTarget()
    })
)
@pure
class InputConstructor extends React.Component {
    static propTypes = {
        field: React.PropTypes.object,
        fields: React.PropTypes.array,
        index: React.PropTypes.number.isRequired,

        onRemoveField: React.PropTypes.func,
        onChangeFieldName: React.PropTypes.func,
        onToggleFieldRequired: React.PropTypes.func,

        connectDragSource: React.PropTypes.func.isRequired,
        connectDropTarget: React.PropTypes.func.isRequired
    }

    render() {
        const {
            field,
            fields,
            onRemoveField,
            onChangeFieldName,
            onToggleFieldRequired,
            connectDragSource,
            connectDropTarget
        } = this.props,
            {id, name, type, isRequired} = field;

        return connectDragSource(connectDropTarget(
            <tr className={ css.module }>
                <td className={ css.colName }>
                    <ContentEditable
                        editing={ !name }
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
                <td className={ css.colRemove }>
                    <button className={ css.remove } onClick={ (event) => {
                        event.preventDefault();
                        onRemoveField(id);
                    } } >
                        Remove
                    </button>
                </td>

            </tr>
        ));
    }
}

import {REMOVE_FIELD, CHANGE_FIELD_NAME, TOGGLE_FIELD_REQUIRED, SWAP_FIELDS} from '../actions';

export default Utils.connect(null, {
    onRemoveField: REMOVE_FIELD,
    onChangeFieldName: CHANGE_FIELD_NAME,
    onToggleFieldRequired: TOGGLE_FIELD_REQUIRED,
    onSwapFields: SWAP_FIELDS
})(InputConstructor);
