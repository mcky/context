import React, {Component} from 'react'

export default class Heading extends Component {

	render () {
		const {content} = this.props
		return <h2>{content}</h2>
	}

}
