
import { undefinedString, nullString } from '../helpers'

import '../../../src/string/extensions/lookForAll'


describe('string-extensions', () => {
	test('lookForAll', () => {
		expect(() => undefinedString.lookForAll(''))
			.toThrow(`Cannot read properties of undefined (reading 'lookForAll')`)
		expect(() => nullString.lookForAll(''))
			.toThrow(`Cannot read properties of null (reading 'lookForAll')`)
		expect('JoeBob'.lookForAll('')).toEqual([])
		expect('JoeBob'.lookForAll('a')).toEqual([])
		expect('JoeBob'.lookForAll('o')).toEqual([[1, 1], [4, 1]])
		expect('JoeBob'.lookForAll('e')).toEqual([[2, 1]])
		expect('JoeBob'.lookForAll('E')).toEqual([])
		expect('JoeBob'.lookForAll(/ebo/i)).toEqual([[2, 3]])
		expect('JoeBob'.lookForAll(/ebo/)).toEqual([])
		expect('JoeBobJoeBob'.lookForAll(/ebo/i)).toEqual([[2, 3], [8, 3]])
		expect('x1x2x3x4x'.lookForAll(/x.*?x/)).toEqual([[0, 3], [2, 3], [4, 3], [6, 3]])
		expect('x1x2x3x4x'.lookForAll(/x.*?x/, true)).toEqual([[0, 3], [4, 3]])
	})
})
