
import { first } from '../first'


declare global {
    interface String {
        first(count?: number): string
    }
}

String.prototype.first = function (count?: number) {
	return first(this.valueOf(), count)
}
