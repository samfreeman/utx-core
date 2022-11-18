
import { peek } from '../peek'


declare global {
	interface Array<T> {
		peek(): T | undefined
	}
}

Array.prototype.peek = function <T>(): T | undefined {
	return peek(this)
}
