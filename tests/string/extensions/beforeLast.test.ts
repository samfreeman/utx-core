
import { undefinedString, nullString } from '../helpers'

import '../../../src/string/extensions/beforeLast'


describe('string', () => {
	test('beforeLast', () => {
		expect(() => undefinedString.beforeLast(''))
			.toThrow(`Cannot read properties of undefined (reading 'beforeLast')`)
		expect(() => nullString.beforeLast(''))
			.toThrow(`Cannot read properties of null (reading 'beforeLast')`)
        expect(''.beforeLast('')).toBe('')
        expect(''.beforeLast('a')).toBe('')
        expect('JoeBob'.beforeLast('')).toBe('JoeBob')
        expect('JoeBob'.beforeLast('a')).toBe('JoeBob')
        expect('JoeBob'.beforeLast('o')).toBe('JoeB')
        expect('JoeBob'.beforeLast('B')).toBe('Joe')
        expect('JoeBob'.beforeLast('E')).toBe('JoeBob')
        expect('JoeBob'.beforeLast(/ebo/i)).toBe('Jo')
        expect('JoeBob'.beforeLast(/ebo/)).toBe('JoeBob')
    })
})
