import React, {Component, PropTypes} from 'react'
import Field from './Field.jsx'
import NewField from './NewField.jsx'

export default class EditorPanel extends Component {

	render () {
		const {actions, fields, fieldsById} = this.props

		return (
			<div className="editor">
				<ul>
					{fields.map(fieldIndex => {
						const field = fieldsById[fieldIndex]
						return <Field key={field.id} {...actions} {...field} />
					})}
				</ul>
				<NewField addField={actions.addField} />
			</div>
		)
	}
}
