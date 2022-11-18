
import { verify } from '../../src/function/verify'


describe('function', () => {
	test('verify', () => {
		const fn = (arg1: string, arg2: number): void => {
			const s = arg1
			const x = arg2
			verify(fn, { s, x },
				() => !!s,
				() => x > 0)
		}

		expect(() => fn('', 0)).toThrow(
			`Verification failure in function 'fn'.\n` +
			`  Variable 's' should satisfy expression '!!s'.\n` +
			`  Variable values: s = ""`)

		expect(() => fn('abc', -1)).toThrowError(
			`Verification failure in function 'fn'.\n` +
			`  Variable 'x' should satisfy expression 'x > 0'.\n` +
			`  Variable values: x = -1`)

		expect(() => fn('abc', 1)).not.toThrowError()


		const fn2 = (arg1: string, arg2: number, arg3: string): void => {
			const s = arg1
			const x = arg2
			const t = arg3
			verify(fn2, { s, x, t },
				() => !!s || 'should not be empty',
				() => x > 0 || `Variable 'x' should be positive`,
				() => t.length > 0 || 'have a value')
		}

		expect(() => fn2('', 1, 'Joe')).toThrowError(
			`Verification failure in function 'fn2'.\n` +
			`  Variable 's' should not be empty.\n` +
			`  Variable values: s = ""`)
		expect(() => fn2('abc', 0, 'Joe')).toThrowError(
			`Verification failure in function 'fn2'.\n` +
			`  Variable 'x' should be positive.\n` +
			`  Variable values: x = 0`)
		expect(() => fn2('abc', 1, '')).toThrowError(
			`Verification failure in function 'fn2'.\n` +
			`  Variable 't' should have a value.\n` +
			`  Variable values: t = ""`)
		expect(() => fn2('abc', 1, 'Joe')).not.toThrowError()


		const fn3 = (arg1: number, arg2: number): void => {
			const x = arg1
			const y = arg2
			verify(fn3, { x, y },
				() => x > 0,
				() => y > 0 || 'should be positive',
				() => x < y)
		}

		expect(() => fn3(0, 1)).toThrowError(
			`Verification failure in function 'fn3'.\n` +
			`  Variable 'x' should satisfy expression 'x > 0'.\n` +
			`  Variable values: x = 0`)
		expect(() => fn3(1, 0)).toThrowError(
			`Verification failure in function 'fn3'.\n` +
			`  Variable 'y' should be positive.\n` +
			`  Variable values: y = 0`)
		expect(() => fn3(2, 1)).toThrowError(
			`Verification failure in function 'fn3'.\n` +
			`  Variables 'x' and 'y' should satisfy expression 'x < y'.\n` +
			`  Variable values: x = 2, y = 1`)
		expect(() => fn3(1, 2)).not.toThrowError()

		
		const fn4 = (arg1: number): void => {
			const x = arg1
			verify(fn4, { x }, function () { return x > 0 })
		}

		expect(() => fn4(0)).toThrow(
			'Condition error in function \'fn4\'.\n' +
			`  Condition 'function () { return x > 0; }' is invalid - ` +
			`it should be an arrow function with no arguments.`)
	})
})
