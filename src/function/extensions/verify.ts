
import { Condition } from '../condition'
import { verify } from '../verify'


declare global {
    interface Function {
        verify(values: { [key: string]: unknown }, ...conditions: Condition[]): void
    }
}

Function.prototype.verify = function (
	values: { [key: string]: unknown },
	...conditions: Condition[]
) {
	verify(this, values, ...conditions)
}
