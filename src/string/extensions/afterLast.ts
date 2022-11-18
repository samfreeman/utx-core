
import { afterLast } from '../afterLast'


declare global {
    interface String {
        afterLast(what: string | RegExp): string
    }
}

String.prototype.afterLast = function (what: string | RegExp): string {
	return afterLast(this.valueOf(), what)
}
