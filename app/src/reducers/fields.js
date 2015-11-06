import omit from 'lodash/object/omit'
import assign from 'lodash/object/assign'
import mapValues from 'lodash/object/mapValues'

const initialState = {
	fields: ['one', 'two', 'four', 'three'],
	fieldsById: {
		'one': {
			id: 'one',
			type: 'text',
			content: 'sample text',
		},
		'two': {
			id: 'two',
			type: 'list',
			content: ['one', 'two'],
			meta: {
				'variation': 'ol',
			},
		},
		'three': {
			id: 'three',
			type: 'separator',
		},
		'four': {
			id: 'four',
			type: 'text',
			content: 'last text',
		},
	},
}

const generateId = () => Math.random().toString(36).substr(2, 5)

const reorderArray = (arr, fromIndex, toIndex) => {
	const element = arr[fromIndex]
	arr.splice(fromIndex, 1)
	arr.splice(toIndex, 0, element)
	return arr
}

const actions = {
	ADD_FIELD: function(state, {body}) {
		const newId = generateId(state)
		return {
			...state,
			fields: state.fields.concat(newId),
			fieldsById: {
				...state.fieldsById,
				[newId]: {
					id: newId,
					...body,
				},
			},
		}
	},

	DELETE_FIELD: function(state, {id: fieldId}) {
		return {
			...state,
			fields: state.fields.filter(id => id !== fieldId),
			fieldsById: omit(state.fieldsById, fieldId),
		}
	},

	REORDER_FIELD: function(state, {dragIndex, hoverIndex}) {
		const fields = reorderArray(state.fields, dragIndex, hoverIndex)

		return {
			...state,
			fields,
		}
	},

	CHANGE_FIELD: function(state, {id, body}) {
		const {content, meta} = body
		return {
			...state,
			fieldsById: mapValues(state.fieldsById, (field) => {
				return field.id === id ?
						assign({}, field, (content ? {content} : {meta}))
					:
						field
			}),
		}
	},
}

export default function fields(state = initialState, action) {
	const actionFn = actions[action.type]
	return actionFn ? (actionFn(state, action)) : state
}
