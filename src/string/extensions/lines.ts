
import { lines } from '../lines'


declare global {
    interface String {
        lines(sep?: string | RegExp): string[]
    }
}

String.prototype.lines = function (sep: string | RegExp = /\r?\n/): string[] {
	return lines(this.valueOf(), sep)
}
