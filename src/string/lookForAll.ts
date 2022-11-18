
import { NotFound, LookForResult } from './types'
import { lookFor } from './lookFor'


export const lookForAll = (
	value: string,
	what: string | RegExp,
	skipMatches?: boolean
): LookForResult[] => {
	if (!value || (typeof what == 'string' && what == ''))
		return []

	const result: [number, number][] = []
	let i = 0
	while (i < value.length){
		const match = lookFor(value, what, i)
		if (match == NotFound){
			i++
			continue
		}
		result.push(match)
		i = match[0] + (skipMatches ? match[1] : 1)
	}
	return result
}

export default lookForAll
