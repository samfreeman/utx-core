
import { last } from '../last'


declare global {
    interface String {
        last(count?: number): string
    }
}

String.prototype.last = function (count?: number): string {
	return last(this.valueOf(), count)
}
