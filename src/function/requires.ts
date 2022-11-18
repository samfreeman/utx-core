/* eslint-disable indent */
/* eslint-disable @typescript-eslint/ban-types */

import { Condition, testCondition } from './condition'


export const requires = <TFn extends Function>(
	fn: TFn,
	values: { [key: string]: unknown },
	...conditions: Condition[]
): void =>
	conditions.forEach(condition =>
		testCondition(fn, values, condition, { 
			testName: 'Precondition',
			valueName: 'Argument'
		}))


export const ensures = <TFn extends Function>(
	fn: TFn,
	values: { [key: string]: unknown },
	...conditions: Condition[]
): void =>
	conditions.forEach(condition =>
		testCondition(fn, values, condition, {
			testName: 'Postcondition',
			valueName: 'Result'
		}))


export default requires
