import React, {Component} from 'react'
import cx from 'bem-classnames'
import {Text, List, Separator} from './Fields'

export default class Field extends Component {

	getField(type) {
		const {content, meta} = this.props
		switch(type) {
			case 'text':
				return <Text {...{content, meta}}  />
			case 'list':
				return <List {...{content, meta}}/>
			case 'separator':
				return <Separator {...{content, meta}}/>
			default:
				return <div />
		}
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
