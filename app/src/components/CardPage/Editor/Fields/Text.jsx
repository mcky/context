import React, {Component} from 'react'
import Textarea from 'react-textarea-autosize'

export const TextSchema = {
	content: '',
}

export default class Text extends Component {

	render() {
		const {onContentChange: handleChange, content: value, type} = this.props
		const onChange = (evt) => handleChange(evt.target.value)

		return type === 'heading' ?
			<input type="text" {...{value, onChange}} />
		:
			<Textarea maxRows={4} {...{value, onChange}}/>
	}

}
