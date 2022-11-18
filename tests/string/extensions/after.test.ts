
import { undefinedString, nullString } from '../helpers'

import '../../../src/string/extensions/after'


describe('string-extensions', () => {
	test('after', () => {
		expect(() => undefinedString.after(''))
			.toThrow(`Cannot read properties of undefined (reading 'after')`)
		expect(() => nullString.after(''))
			.toThrow(`Cannot read properties of null (reading 'after')`)
		expect(''.after('')).toBe('')
		expect(''.after('a')).toBe('')
		expect('JoeBob'.after('')).toBe('JoeBob')
		expect('JoeBob'.after('a')).toBe('JoeBob')
		expect('JoeBob'.after('o')).toBe('eBob')
		expect('JoeBob'.after('e')).toBe('Bob')
		expect('JoeBob'.after('E')).toBe('JoeBob')
		expect('JoeBob'.after(/ebo/i)).toBe('b')
		expect('JoeBob'.after(/ebo/)).toBe('JoeBob')

		expect((() => { }).toString().after('(')).toBe(') => { }')
	})
})
