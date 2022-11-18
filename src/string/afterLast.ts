
import { lookForLast } from './lookForLast'


export const afterLast = (value: string, what: string | RegExp): string => {
	const [start, length] = lookForLast(value, what)
	return start < 0 ? value : value.slice(start + length)
}
