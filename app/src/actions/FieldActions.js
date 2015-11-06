import {FieldActionTypes as types} from '_constants/'

export const addField = (body) => ({
	type: types.ADD_FIELD,
	body,
})

export const deleteField = (id) => ({
	type: types.DELETE_FIELD,
	id,
})

export const reorderField = (dragIndex, hoverIndex) => ({
	type: types.REORDER_FIELD,
	dragIndex,
	hoverIndex,
})

export const changeFieldContent = (id, content) => ({
	type: types.CHANGE_FIELD,
	id,
	body: {content},
})

export const changeFieldMeta = (id, meta) => ({
	type: types.CHANGE_FIELD,
	id,
	body: {meta},
})
