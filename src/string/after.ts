
import { lookFor } from './lookFor'


export const after = (value: string, what: string|RegExp): string => {
	const [start, length] = lookFor(value, what)
	return start < 0 ? value : value.slice(start + length)
}

export default after
