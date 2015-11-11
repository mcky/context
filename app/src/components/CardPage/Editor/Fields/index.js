import Text, {TextSchema} from './Text.jsx'
import List, {ListMeta, ListSchema} from './List.jsx'

export const FieldSchema = {
	List: ListSchema,
	Text: TextSchema,
	Heading: TextSchema,
	Separator: {},
}

export const FieldMeta = {
	List: ListMeta,
}

export default {
	Text,
	Heading: Text,
	List,
}
