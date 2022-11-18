
import { lookForLast } from './lookForLast'


export const beforeLast = (value: string, what: string|RegExp): string => {
	const [index] = lookForLast(value, what)
	return index < 0 ? value : value.slice(0, index)
}

export default beforeLast
