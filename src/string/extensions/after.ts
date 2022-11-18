
import { after } from '../after'


declare global {
    interface String {
        after(what: string|RegExp): string
    }
}

String.prototype.after = function (what: string|RegExp): string {
	return after(this.valueOf(), what)
}
