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

class ListItem extends Component {

	focusInput() {
		this.refs.input.focus()
	}

	render() {
		const {index, changeContent, value} = this.props
		const onChange = changeContent.bind(null, index)
		return <input type="text" ref="input" {...{onChange, value}} />
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
		if (content.length > oldContent.length) this.refs.last.focusInput()
	}

	newItemDisabled = () => {
		const {content} = this.props
		const lastItem = content[content.length-1]
		return typeof(lastItem) !== 'undefined' && lastItem === ''
	}

	newItem = () => {
		let {content, onContentChange} = this.props
		onContentChange([
			...content,
			'',
		])
	}

	render() {
		const {content, meta} = this.props
		const disabled = this.newItemDisabled()

		return (
			<div>
				{content.map((value, index) => {
					const ref = content.length-1 === index ? 'last' : null
					const {changeContent} = this
					return <ListItem {...{index, ref, value, changeContent}} key={index} />
				})}

				<button {...{disabled}} onClick={this.newItem}>New</button>
			</div>
		)
	}

}
