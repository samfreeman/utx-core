

export type LookForResult = [number, number]

export const NotFound: LookForResult = [-1, 0]


export const lookFor = (
	value: string,
	what: string | RegExp,
	start?: number
): LookForResult => {
	if (typeof what == 'string' && what == '')
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
	return !match
		? NotFound
		: [start + (match.index ?? 0), match[0].length]
}


export default lookFor
