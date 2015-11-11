export default {
	fields: ['four', 'one', 'three', 'two'],
	fieldsById: {
		'one': {
			id: 'one',
			type: 'text',
			content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum sollicitudin nulla sit amet pharetra.',
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
			type: 'heading',
			content: 'Sample heading',
		},
	},
}
