
import { lookForLast } from '../lookForLast'


declare global {
    interface String {
        lookForLast(what: string | RegExp): [number, number]
    }
}

String.prototype.lookForLast = function (what: string | RegExp): [number, number] {
	return lookForLast(this.valueOf(), what)
}
