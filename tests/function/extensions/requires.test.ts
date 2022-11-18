
import '../../../src/function/extensions/requires'


describe('function-extensions', () => {
	test('requires', () => {
		const fn = (arg1: string, arg2: number): void => {
			fn.requires({ arg1, arg2 },
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
	})

	test('ensures', () => {
		const fn = (arg1: string, arg2: number): void => {
			const result = arg1 + arg2
			fn.ensures({ result }, () => result.length > 2)
		}

		expect(() => fn('', 0)).toThrow(
			`Postcondition failure in function 'fn'.\n` +
			`  Result 'result' should satisfy expression 'result.length > 2'.\n` +
			`  Result values: result = "0"`)
		expect(() => fn('abc', 1)).not.toThrowError()
	})
})
