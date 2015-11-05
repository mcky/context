import React, {Component} from 'react'
import Field from './Field.jsx'

export default class Card extends Component {

	render () {
		const {actions, fields, fieldsById} = this.props

		return (
			<div className="card">
				<ul>
					{fields.map(fieldIndex => {
						const field = fieldsById[fieldIndex]
						return <Field key={field.id} {...{actions}} {...field} />
					})}
				</ul>
			</div>
		)
	}
}
