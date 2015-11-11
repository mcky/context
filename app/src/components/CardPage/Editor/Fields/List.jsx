import React, {Component} from 'react'

export const ListSchema = {
	content: [''],
	meta: {
		variation: 'ul',
	},
}

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

	componentDidUpdate = ({content: oldContent}) => {
		const {content} = this.props
		if (content.length > oldContent.length) this.refs.last.focus()
	}

	newFieldDisabled = () => {
		const {content} = this.props
		const lastItem = content[content.length-1]
		return typeof(lastItem) !== 'undefined' && lastItem === ''
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
		const disabled = this.newFieldDisabled()

		return (
			<div>
				{content.map((value, index) => {
					const onChange = this.changeContent.bind(null, index)
					const ref = content.length-1 === index ? 'last' : null
					return <input type="text" {...{onChange, value, ref}} key={index} />
				})}

				<button {...{disabled}} onClick={this.newField}>New</button>
			</div>
		)
	}

}
