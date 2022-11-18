
import { lookFor } from './lookFor'


export const before = (value: string, what: string | RegExp): string => {
	const [index] = lookFor(value, what)
	return index < 0 ? value : value.slice(0, index)
}
