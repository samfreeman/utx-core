
import '../../../src/array/extensions/peek'


describe('array-extensions', () => {
	test('peek', () => {
		expect([].peek()).toBeUndefined()
		expect([1].peek()).toBe(1)
		expect([1, 2].peek()).toBe(2)
		expect([1, 2, 3].peek()).toBe(3)
	})
})
