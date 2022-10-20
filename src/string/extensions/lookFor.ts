
import { lookFor, LookForResult } from '../lookFor'


declare global {
    interface String {
        lookFor(what: string | RegExp, start?: number): LookForResult
    }
}

String.prototype.lookFor = function (what: string | RegExp, start?: number) {
	return lookFor(this.valueOf(), what, start)
}
