import React, {Component, PropTypes} from 'react'
import mapValues from 'lodash/object/mapValues'
import Field from './Field.jsx'
import NewField from './NewField.jsx'

export default class EditorPanel extends Component {

	render () {
		const {actions, fields} = this.props

		return (
			<div className="editor">
				<ul>
					{mapValues(fields, (field) => {
						return (
							<Field key={field.id} {...actions} {...field} />
						)
					})}
				</ul>
				<NewField addField={actions.addField} />
			</div>
		)
	}
}
