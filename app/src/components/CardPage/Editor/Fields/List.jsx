import React, {Component} from 'react'

// TODO: Abstract to array field type
export default class List extends Component {

	changeType = (evt) => {
		this.props.onMetaChange({
			variation: evt.target.value,
		})
	}

	changeContent = (index, evt) => {
		let {content, onContentChange} = this.props
		content[index] = evt.target.value
		onContentChange(content)
	}

	newField = () => {
		let {content, onContentChange} = this.props
		onContentChange([
			...content,
			'',
		])
	}

	render() {
		const {onChange: handleChange, content, meta} = this.props

		const types = [
			{text: 'Unordered', value: 'ul'},
			{text: 'Ordered', value: 'ol'},
		]

		const currentType = types.filter(t => t.value === meta.variation)[0]

		return (
			<div>
				<select value={currentType.value} onChange={this.changeType}>
					{types.map((type) => {
						return <option value={type.value}>{type.text}</option>
					})}
				</select>

				{content.map((item, index) => {
					return (
						<input type="text" value={item} onChange={this.changeContent.bind(null, index)} />
					)
				})}

				<button onClick={this.newField}>New</button>
			</div>
		)
	}

}
