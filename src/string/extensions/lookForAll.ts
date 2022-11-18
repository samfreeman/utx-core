
import { LookForResult } from '../types'
import { lookForAll } from '../lookForAll'


declare global {
	interface String {
		lookForAll(what: string | RegExp, skipMatches?: boolean): LookForResult[]
	}
}

String.prototype.lookForAll = function (what: string | RegExp, skipMatches?: boolean): LookForResult[] {
	return lookForAll(this.valueOf(), what, skipMatches)
}
