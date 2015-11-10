import React, {Component} from 'react'

export class ListMeta extends Component {

	changeType = (evt) => {
		this.props.onMetaChange({
			variation: evt.target.value,
		})
	}

	render() {
		const {meta} = this.props
		const types = [
			{text: 'Unordered', value: 'ul'},
			{text: 'Ordered', value: 'ol'},
		]
		const currentType = types.filter(t => t.value === meta.variation)[0]

		return (
			<select value={currentType.value} onChange={this.changeType}>
				{types.map(({value, text}, key) => <option {...{key, value}}>{text}</option>)}
			</select>
		)
	}
}


export default class List extends Component {

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
		const {content, meta} = this.props

		return (
			<div>
				{content.map((value, index) => {
					const onChange = this.changeContent.bind(null, index)
					return <input type="text" {...{onChange, value}} key={index} />
				})}

				<button onClick={this.newField}>New</button>
			</div>
		)
	}

}
