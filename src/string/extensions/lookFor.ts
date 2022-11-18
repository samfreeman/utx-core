
import { LookForResult } from '../../string/types'
import { lookFor } from '../../string/lookFor'


declare global {
	interface String {
		lookFor(what: string | RegExp, start?: number): LookForResult
	}
}

String.prototype.lookFor = function (what: string | RegExp, start?: number) {
	return lookFor(this.valueOf(), what, start)
}
