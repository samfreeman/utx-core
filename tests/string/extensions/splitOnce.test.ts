
import { undefinedString, nullString } from '../helpers'

import '../../../src/string/extensions/splitOnce'


describe('string-extensions', () => {
	test('splitOnce', () => {
		expect(() => undefinedString.splitOnce('a'))
			.toThrow(`Cannot read properties of undefined (reading 'splitOnce')`)
		expect(() => nullString.splitOnce('a'))
			.toThrow(`Cannot read properties of null (reading 'splitOnce')`)

		expect(''.splitOnce('')).toEqual([''])
		expect(''.splitOnce('a')).toEqual([''])
		expect('JoeBob'.splitOnce('')).toEqual(['JoeBob'])
		expect('JoeBob'.splitOnce('a')).toEqual(['JoeBob'])
		expect('JoeBob'.splitOnce('o')).toEqual(['J', 'eBob'])
		expect('JoeBob'.splitOnce('o', true)).toEqual(['JoeB', 'b'])
		expect('JoeBob'.splitOnce('e')).toEqual(['Jo', 'Bob'])
		expect('JoeBob'.splitOnce('E')).toEqual(['JoeBob'])
		expect('JoeBob'.splitOnce(/ebo/i)).toEqual(['Jo', 'b'])
		expect('JoeBob'.splitOnce(/ebo/)).toEqual(['JoeBob'])
	})
})
