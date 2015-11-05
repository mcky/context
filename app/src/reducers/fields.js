import omit from 'lodash/object/omit'
import assign from 'lodash/object/assign'
import mapValues from 'lodash/object/mapValues'

const initialState = {
	fields: [1, 2],
	fieldsById: {
		1: {
			id: 1,
			type: 'text',
			content: 'sample text',
		},
		2: {
			id: 2,
			type: 'list',
			content: ['one', 'two'],
			meta: {
				'variation': 'ol',
			},
		},
	},
}

const generateId = function(state) {
	const fields = state.fields
		, fieldLen = fields.length
	return fieldLen > 0
		? fields[fieldLen-1] + 1 : 1
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
