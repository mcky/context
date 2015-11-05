import React, {Component} from 'react'

class ListType extends Component {
	render() {
		const {children, variation} = this.props
		return variation === 'ol'
			?
				<ol>{children}</ol>
			:
				<ul>{children}</ul>
	}
}

export default class List extends Component {

	render() {
		const {content: list, meta: {variation}} = this.props
		return (
			<ListType {...{variation}}>
				{list.map(item => (
					<li>{item}</li>
				))}
			</ListType>
		)
	}

}
