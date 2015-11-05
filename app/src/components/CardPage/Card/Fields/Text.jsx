import React, {Component} from 'react'

export default class Text extends Component {

	render () {
		const {content} = this.props
		return <div>{content}</div>
	}

}
