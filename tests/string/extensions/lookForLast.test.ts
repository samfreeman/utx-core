
import { undefinedString, nullString } from '../helpers'

import { NotFound } from '../../../src/string/types'
import '../../../src/string/extensions/lookForLast'


describe('string-extensions', () => {
	test('lookForLast', () => {
		expect(() => undefinedString.lookForLast(''))
			.toThrow(`Cannot read properties of undefined (reading 'lookForLast')`)
		expect(() => nullString.lookForLast(''))
			.toThrow(`Cannot read properties of null (reading 'lookForLast')`)
        expect('JoeBob'.lookForLast('')).toEqual(NotFound)
        expect('JoeBob'.lookForLast('a')).toEqual(NotFound)
        expect('JoeBob'.lookForLast('o')).toEqual([4, 1])
        expect('JoeBob'.lookForLast('e')).toEqual([2, 1])
        expect('JoeBob'.lookForLast('E')).toEqual(NotFound)
        expect('JoeBob'.lookForLast(/ebo/i)).toEqual([2, 3])
        expect('JoeBob'.lookForLast(/ebo/)).toEqual(NotFound)
        expect('JoeBobJoeBob'.lookForLast(/ebo/i)).toEqual([8, 3])
    })
})
