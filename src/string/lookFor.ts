
import { LookForResult, NotFound } from './types'


export const lookFor = (
	value: string,
	what: string | RegExp,
	start?: number
): LookForResult => {
	if (!value || (typeof what == 'string' && what == ''))
		return NotFound

	start = start ?? 0
	if (start >= value.length)
		return NotFound

	if (start <= -value.length)
		start = 0
	else if (start < 0)
		start = value.length + start

	if (typeof what == 'string') {
		const index = value.indexOf(what, start)
		return index < 0 ? NotFound : [index, what.length]
	}

	if (start != 0)
		value = value.slice(start)
	const match = value.match(what)
	return match == null || match.index == null
		? NotFound
		: [start + match.index, match[0].length]
}


export default lookFor
