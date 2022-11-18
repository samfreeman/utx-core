
import { peek } from '../../src/array/peek'


describe('array', () => {
	test('peek', () => {
		expect(peek([])).toBeUndefined()
		expect(peek([1])).toBe(1)
		expect(peek([1, 2])).toBe(2)
		expect(peek([1, 2, 3])).toBe(3)
	})
})
