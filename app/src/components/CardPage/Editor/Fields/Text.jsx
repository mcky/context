import React, {Component} from 'react'

export default class Field extends Component {

	render() {
		const {onContentChange: handleChange, content: value} = this.props
		const onChange = (evt) => handleChange(evt.target.value)
		return (
			<input type="text" {...{value, onChange}} />
		)
	}

}
