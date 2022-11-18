
import { undefinedString, nullString } from '../helpers'

import '../../../src/string/extensions/first'


describe('string-extensions', () => {
	test('first', () => {
		expect(() => undefinedString.first())
			.toThrow(`Cannot read properties of undefined (reading 'first')`)
		expect(() => nullString.first())
			.toThrow(`Cannot read properties of null (reading 'first')`)

		expect(''.first()).toBe('')
        expect('JoeBob'.first()).toBe('J')
        expect('JoeBob'.first(-7)).toBe('')
        expect('JoeBob'.first(-6)).toBe('')
        expect('JoeBob'.first(-5)).toBe('J')
        expect('JoeBob'.first(-4)).toBe('Jo')
        expect('JoeBob'.first(-3)).toBe('Joe')
        expect('JoeBob'.first(-2)).toBe('JoeB')
        expect('JoeBob'.first(-1)).toBe('JoeBo')
        expect('JoeBob'.first(0)).toBe('')
        expect('JoeBob'.first(1)).toBe('J')
        expect('JoeBob'.first(2)).toBe('Jo')
        expect('JoeBob'.first(3)).toBe('Joe')
        expect('JoeBob'.first(4)).toBe('JoeB')
        expect('JoeBob'.first(5)).toBe('JoeBo')
        expect('JoeBob'.first(6)).toBe('JoeBob')
        expect('JoeBob'.first(7)).toBe('JoeBob')
	})
})
