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
		const {index, changeContent, deleteItem, handleKeyUp, isLast, value} = this.props
		const onChange = changeContent.bind(null, index)
		const onKeyUp = handleKeyUp.bind(null, isLast)
		const handleDelete = deleteItem.bind(null, index)

		return (
			<div className="editor__field--list__item">
				<input className="editor__field--list__item__input" type="text" ref="input" {...{onChange, onKeyUp, value}} />
				<button onClick={handleDelete}>x</button>
			</div>
		)
	}
}

export default class List extends Component {

	changeContent = (index, evt) => {
		const {content, onContentChange} = this.props
		const contentCopy = content.slice()
		contentCopy[index] = evt.target.value
		onContentChange(contentCopy)
	}

	handleKeyUp = (isLast, {keyCode}) => {
		if (isLast && keyCode === 13 && !this.newItemDisabled()) this.newItem()
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

	deleteItem = (index) => {
		let {content, onContentChange} = this.props
		const contentCopy = content.slice()
		contentCopy.splice(index, 1)
		onContentChange(contentCopy)
	}

	render() {
		const {content, meta} = this.props
		const disabled = this.newItemDisabled()

		return (
			<div>
				{content.map((value, index) => {
					const last = content.length-1 === index ? 'last' : null
					const {changeContent, deleteItem, handleKeyUp} = this
					return <ListItem {...{index, ref: last, value, isLast: !!last, changeContent, deleteItem, handleKeyUp}} key={index} />
				})}

				<button {...{disabled}} onClick={this.newItem}>New</button>
			</div>
		)
	}

}
