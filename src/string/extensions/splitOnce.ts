
import { SplitOnceResult } from '../types'
import { splitOnce } from '../splitOnce'


declare global {
    interface String {
        splitOnce(on: string|RegExp, last?: boolean): SplitOnceResult
    }
}

String.prototype.splitOnce = function (on: string|RegExp, last?: boolean): SplitOnceResult {
	return splitOnce(this.valueOf(), on, last)
}
