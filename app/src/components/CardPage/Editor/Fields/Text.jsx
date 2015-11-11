import React, {Component} from 'react'
import Textarea from 'react-textarea-autosize'

export const TextSchema = {
	content: '',
}

export default class Text extends Component {

	render() {
		const {onContentChange: handleChange, content: value} = this.props
		const onChange = (evt) => handleChange(evt.target.value)
		return (
			<Textarea type="text" {...{value, onChange}} maxRows={4} />
		)
	}

}
