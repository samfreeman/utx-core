
import { undefinedString, nullString } from '../helpers'

import '../../../src/string/extensions/afterLast'


describe('string-extensions', () => {
	test('afterLast', () => {
		expect(() => undefinedString.afterLast(''))
			.toThrow(`Cannot read properties of undefined (reading 'afterLast')`)
		expect(() => nullString.afterLast(''))
			.toThrow(`Cannot read properties of null (reading 'afterLast')`)

		expect(''.afterLast('')).toBe('')
        expect(''.afterLast('a')).toBe('')
        expect('JoeBob'.afterLast('')).toBe('JoeBob')
        expect('JoeBob'.afterLast('a')).toBe('JoeBob')
        expect('JoeBob'.afterLast('o')).toBe('b')
        expect('JoeBob'.afterLast('B')).toBe('ob')
        expect('JoeBob'.afterLast('E')).toBe('JoeBob')
        expect('JoeBob'.afterLast(/ebo/i)).toBe('b')
        expect('JoeBob'.afterLast(/ebo/)).toBe('JoeBob')
	})
})
