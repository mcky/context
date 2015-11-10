import React, {Component} from 'react'

export const TextSchema = {
	content: '',
}

export default class Text extends Component {

	render() {
		const {onContentChange: handleChange, content: value} = this.props
		const onChange = (evt) => handleChange(evt.target.value)
		return (
			<input type="text" {...{value, onChange}} />
		)
	}

}
