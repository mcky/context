import React, {Component} from 'react'
import cx from 'bem-classnames'
import capitalize from 'lodash/string/capitalize'
import * as FieldTypes from './Fields'

export default class Field extends Component {

	getField(type) {
		const {content, meta} = this.props
		const FieldType = FieldTypes[capitalize(type)]
		return FieldType ? <FieldType {...{content, meta}}/> : <div />
	}

	render () {
		const {type} = this.props

		const className = cx({
			name: 'card__content',
			modifiers: ['type', 'id'],
		}, {
			type,
		})

		return (
			<li {...{className}}>
				{this.getField(type)}
			</li>
		)
	}

}
