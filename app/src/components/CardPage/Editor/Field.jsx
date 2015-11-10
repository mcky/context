import React, {Component, PropTypes} from 'react'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import cx from 'bem-classnames'
import capitalize from 'lodash/string/capitalize'
import FieldTypes, {FieldMeta} from './Fields'

const cardSource = {
	beginDrag: ({id, index}) => ({id, index}),
}

const cardTarget = {
	hover({index: hoverIndex, moveCard}, monitor, component) {
		const dragIndex = monitor.getItem().index

		if (dragIndex === hoverIndex) return

		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
			, hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
			, clientOffset = monitor.getClientOffset()
			, hoverClientY = clientOffset.y - hoverBoundingRect.top

		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

		moveCard(dragIndex, hoverIndex)
		monitor.getItem().index = hoverIndex
	},
}

@DropTarget('field', cardTarget, connect => ({
	connectDropTarget: connect.dropTarget(),
}))
@DragSource('field', cardSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	connectDragPreview: connect.dragPreview(),
	isDragging: monitor.isDragging(),
}))
export default class Field extends Component {

	handleContentChange = (content) => {
		const {changeFieldContent, id} = this.props
		changeFieldContent(id, content)
	}

	handleMetaChange = (meta) => {
		const {changeFieldMeta, id} = this.props
		changeFieldMeta(id, meta)
	}

	GetComponentWithProps(type, components) {
		const baseProps = {
			...this.props,
			onContentChange: this.handleContentChange,
			onMetaChange: this.handleMetaChange,
		}
		const ReturnedComponent = components[capitalize(type)]
		return ReturnedComponent ? <ReturnedComponent {...baseProps} /> : null
	}

	getField = (type) => this.GetComponentWithProps(type, FieldTypes)
	getFieldOptions = (type) => this.GetComponentWithProps(type, FieldMeta)

	render() {
		const { id, type, deleteField,
				isDragging, connectDragSource,
				connectDropTarget, connectDragPreview,
			} = this.props

		const className = cx({
			name: 'editor__field',
			modifiers: ['type', 'id', 'isDragging'],
		}, {
			type,
			isDragging,
		})

		return connectDragPreview(connectDropTarget(
			<li {...{className}}>

				<div className="editor__field__info">

					<span className="editor__field__type">{type}</span>

					{this.getFieldOptions(type)}

					<div className="editor__field__actions">
						{connectDragSource(
							<span className={`editor__field__move`}>MOVE</span>
						)}

						<button className={`editor__field__delete`} onClick={() => deleteField(id)}>
							x
						</button>
					</div>

				</div>

				{this.getField(type)}
			</li>
		))
	}

}
