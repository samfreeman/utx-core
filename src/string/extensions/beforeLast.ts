
import { beforeLast } from '../beforeLast'


declare global {
    interface String {
        beforeLast(what: string|RegExp): string
    }
}

String.prototype.beforeLast = function (what: string|RegExp): string {
	return beforeLast(this.valueOf(), what)
}
