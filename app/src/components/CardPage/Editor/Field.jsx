import React, {Component, PropTypes} from 'react'
import cx from 'bem-classnames'
import {Text, List} from './Fields'

export default class Field extends Component {

	handleContentChange = (content) => {
		const {changeFieldContent, id} = this.props
		changeFieldContent(id, content)
	}

	handleMetaChange = (meta) => {
		const {changeFieldMeta, id} = this.props
		changeFieldMeta(id, meta)
	}

	getField(type) {
		const baseProps = {
			...this.props,
			onContentChange: this.handleContentChange,
			onMetaChange: this.handleMetaChange,
		}
		switch(type) {
			case 'text':
				return <Text {...baseProps}/>
			case 'list':
				return <List {...baseProps}/>
		}
	}

	render() {
		const {id, type, deleteField} = this.props

		const className = cx({
			name: 'editor__field',
			modifiers: ['type', 'id'],
		}, {
			type,
		})

		return (
			<li {...{className}}>

				<div>
					{type}

					<button className={`editor__field__delete`} onClick={() => deleteField(id)}>
						x
					</button>
				</div>

				{this.getField(type)}
			</li>
		)
	}

}
