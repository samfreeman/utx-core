
import { undefinedString, nullString } from '../helpers'

import '../../../src/string/extensions/before'


describe('string-extensions', () => {
	test('before', () => {
		expect(() => undefinedString.before(''))
			.toThrow(`Cannot read properties of undefined (reading 'before')`)
		expect(() => nullString.before(''))
			.toThrow(`Cannot read properties of null (reading 'before')`)
        expect(''.before('')).toBe('')
        expect(''.before('a')).toBe('')
        expect('JoeBob'.before('')).toBe('JoeBob')
        expect('JoeBob'.before('a')).toBe('JoeBob')
        expect('JoeBob'.before('o')).toBe('J')
        expect('JoeBob'.before('B')).toBe('Joe')
        expect('JoeBob'.before('E')).toBe('JoeBob')
        expect('JoeBob'.before(/ebo/i)).toBe('Jo')
        expect('JoeBob'.before(/ebo/)).toBe('JoeBob')

        expect((() => { }).toString().before(')')).toBe('(')
    })
})
