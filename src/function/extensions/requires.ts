
import { Condition } from '../condition'
import { requires, ensures } from '../requires'


declare global {
    interface Function {
        requires(values: { [key: string]: unknown }, ...conditions: Condition[]): void
        ensures(values: { [key: string]: unknown }, ...conditions: Condition[]): void
    }
}

Function.prototype.requires = function (
	values: { [key: string]: unknown },
	...conditions: Condition[]
) {
	requires(this, values, ...conditions)
}

Function.prototype.ensures = function (
	values: { [key: string]: unknown },
	...conditions: Condition[]
) {
	ensures(this, values, ...conditions)
}
