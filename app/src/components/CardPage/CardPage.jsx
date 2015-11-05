import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {FieldActions} from '_actions/'
import {Editor} from './Editor'
import {Card} from './Card'

@connect(state => ({
	fields: state.fields,
}))

export default class CardPage extends Component {

	render() {
		const {fields: {fields, fieldsById}, dispatch} = this.props
		const actions = bindActionCreators(FieldActions, dispatch)

		return (
			<div>
				<Card {...{fields, fieldsById, actions}} />

				<Editor {...{fields, fieldsById, actions}} />
			</div>
		)
	}
}
