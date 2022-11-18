
import '../../../src/function/extensions/verify'


describe('function-extensions', () => {
	test('verify', () => {
		const fn = (arg1: string, arg2: number): void => {
			const s = arg1
			const x = arg2
			fn.verify({ s, x },
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
	})
})
