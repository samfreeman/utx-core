
import { before } from '../before'


declare global {
    interface String {
        before(what: string | RegExp): string
    }
}

String.prototype.before = function (what: string | RegExp): string {
	return before(this.valueOf(), what)
}
