
import { requires, ensures } from '../../src/function/requires'


describe('function', () => {
	test('requires', () => {
		const fn = (arg1: string, arg2: number): void => {
			requires(fn, { arg1, arg2 },
				() => !!arg1,
				() => arg2 > 0)
		}

		expect(() => fn('', 0)).toThrow(
			`Precondition failure in function 'fn'.\n` +
			`  Argument 'arg1' should satisfy expression '!!arg1'.\n` +
			`  Argument values: arg1 = ""`)

		expect(() => fn('abc', -1)).toThrowError(
			`Precondition failure in function 'fn'.\n` +
			`  Argument 'arg2' should satisfy expression 'arg2 > 0'.\n` +
			`  Argument values: arg2 = -1`)

		expect(() => fn('abc', 1)).not.toThrowError()


		const fn2 = (arg1: string, arg2: number, arg3: string): void => {
			requires(fn2, { arg1, arg2, arg3 },
				() => !!arg1 || 'should not be empty',
				() => arg2 > 0 || `Argument 'arg2' should be positive`,
				() => arg3.length > 0 || 'have a value')
		}

		expect(() => fn2('', 1, 'Joe')).toThrowError(
			`Precondition failure in function 'fn2'.\n` +
			`  Argument 'arg1' should not be empty.\n` +
			`  Argument values: arg1 = ""`)
		expect(() => fn2('abc', 0, 'Joe')).toThrowError(
			`Precondition failure in function 'fn2'.\n` +
			`  Argument 'arg2' should be positive.\n` +
			`  Argument values: arg2 = 0`)
		expect(() => fn2('abc', 1, '')).toThrowError(
			`Precondition failure in function 'fn2'.\n` +
			`  Argument 'arg3' should have a value.\n` +
			`  Argument values: arg3 = ""`)
		expect(() => fn2('abc', 1, 'Joe')).not.toThrowError()
	})

	test('ensures', () => {
		const fn = (arg1: string, arg2: number): void => {
			const result = arg1 + arg2
			ensures(fn, { result }, () => result.length > 2)
		}

		expect(() => fn('', 0)).toThrow(
			`Postcondition failure in function 'fn'.\n` +
			`  Result 'result' should satisfy expression 'result.length > 2'.\n` +
			`  Result values: result = "0"`)
		expect(() => fn('abc', 1)).not.toThrowError()


		const fn2 = (arg1: string, arg2: number, arg3: string): void => {
			const result = arg1 + arg2 + arg3
			ensures(fn2, { result }, () => result.length > 4)
		}

		expect(() => fn2('', 1, 'Joe')).toThrowError(
			`Postcondition failure in function 'fn2'.\n` +
			`  Result 'result' should satisfy expression 'result.length > 4'.\n` +
			`  Result values: result = "1Joe"`)
		expect(() => fn2('a', 1, 'Joe')).not.toThrowError()
	})
})
