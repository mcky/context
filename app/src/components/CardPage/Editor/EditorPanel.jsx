import React, {Component, PropTypes} from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Field from './Field.jsx'
import NewField from './NewField.jsx'

@DragDropContext(HTML5Backend)
export default class EditorPanel extends Component {

	moveCard = (dragIndex, hoverIndex) => {
		const {actions: {reorderField}} = this.props
		reorderField(dragIndex, hoverIndex)
	}

	render () {
		const {actions, fields, fieldsById} = this.props

		return (
			<div className="editor">
				<ul>
					{fields.map((id, index) => {
						const field = fieldsById[id]
						return <Field key={id} {...actions} {...field} {...{index}} moveCard={this.moveCard} />
					})}
				</ul>
				<NewField addField={actions.addField} />
			</div>
		)
	}
}
