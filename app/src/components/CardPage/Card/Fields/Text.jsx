import React, {Component} from 'react'

export default class Text extends Component {

	render () {
		const {content} = this.props
		return <p>{content}</p>
	}

}
