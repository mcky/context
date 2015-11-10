import React, {Component} from 'react'
import {FieldSchema} from './Fields'

export default class NewField extends Component {

	constructor(props, context) {
		super(props, context)
		this.state = {type: 'text'}
	}

	handleChange = (evt) => {
		this.setState({type: evt.target.value})
	}

	handleSubmit = () => {
		const {state: {type}, props: {addField}} = this
		addField({
			type,
			...FieldSchema[type],
		})
	}

	render() {
		const {type: currentType} = this.state

		return (
			<div className="editor__new">
				<select value={currentType} onChange={this.handleChange}>
					{Object.keys(FieldSchema).map((type, index) => {
						return <option value={type} key={index}>{type}</option>
					})}
				</select>
				<button onClick={this.handleSubmit}>new</button>
			</div>
		)
	}
}
