
import { NotFound, LookForResult } from './types'
import { lookFor } from './lookFor'


export const lookForLast = (
	value: string,
	what: string | RegExp
): LookForResult => {
	if (!value || (typeof what == 'string' && what == ''))
		return NotFound

	for (let i = 1; i <= value.length; i++){
		const match = lookFor(value, what, -i)
		if (match != NotFound)
			return match
	}
	return NotFound
}
