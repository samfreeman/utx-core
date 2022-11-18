
import { SplitOnceResult } from './types'
import { lookFor } from './lookFor'
import { lookForLast } from './lookForLast'


export const splitOnce = (value: string, on: string | RegExp, last?: boolean): SplitOnceResult => {
	const [start, length] = last ? lookForLast(value, on) : lookFor(value, on)
	return start < 0 ? [value] : [value.slice(0, start), value.slice(start + length)]
}

export default splitOnce
