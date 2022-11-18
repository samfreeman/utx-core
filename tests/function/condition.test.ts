
import { testCondition } from '../../src/function/condition'


describe('function', () => {
	test('testCondition', () => {
		const options = {
			testName: 'Tree',
			valueName: 'Child',
			pluralValueName: 'Children'
		}

		const x = false
		expect(() => testCondition(() => x, { x }, () => !!x, options)).toThrowError(
			'Tree failure in function \'\'.\n' +
			'  Child \'x\' should satisfy expression \'!!x\'.\n' +
			'  Child values: x = false')
	})
})
