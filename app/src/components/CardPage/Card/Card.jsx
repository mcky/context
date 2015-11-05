import React, {Component} from 'react'
import mapValues from 'lodash/object/mapValues'
import Field from './Field.jsx'

export default class Card extends Component {

	render () {
		const {actions, fields} = this.props
		return (
			<div className="card">
				<ul>
					{mapValues(fields, (field) => {
						return (
							<Field key={field.id} {...{actions}} {...field} />
						)
					})}
				</ul>
			</div>
		)
	}
}
