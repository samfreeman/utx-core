
import { undefinedString, nullString } from '../helpers'

import '../../../src/string/extensions/last'


describe('string-extensions', () => {
	test('last', () => {
		expect(() => undefinedString.last())
			.toThrow(`Cannot read properties of undefined (reading 'last')`)
		expect(() => nullString.last())
			.toThrow(`Cannot read properties of null (reading 'last')`)

        expect(''.last()).toBe('')
        expect('JoeBob'.last()).toBe('b')
        expect('JoeBob'.last(-7)).toBe('')
        expect('JoeBob'.last(-6)).toBe('')
        expect('JoeBob'.last(-5)).toBe('b')
        expect('JoeBob'.last(-4)).toBe('ob')
        expect('JoeBob'.last(-3)).toBe('Bob')
        expect('JoeBob'.last(-2)).toBe('eBob')
        expect('JoeBob'.last(-1)).toBe('oeBob')
        expect('JoeBob'.last(0)).toBe('')
        expect('JoeBob'.last(1)).toBe('b')
        expect('JoeBob'.last(2)).toBe('ob')
        expect('JoeBob'.last(3)).toBe('Bob')
        expect('JoeBob'.last(4)).toBe('eBob')
        expect('JoeBob'.last(5)).toBe('oeBob')
        expect('JoeBob'.last(6)).toBe('JoeBob')
        expect('JoeBob'.last(7)).toBe('JoeBob')
	})
})
