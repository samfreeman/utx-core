/* eslint-disable indent */
/* eslint-disable @typescript-eslint/ban-types */

import { Condition, testCondition } from './condition'


export const verify = <TFn extends Function>(
	fn: TFn,
	values: { [key: string]: unknown },
	...conditions: Condition[]
): void =>
	conditions.forEach(condition =>
		testCondition(fn, values, condition))


export default verify
