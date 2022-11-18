
import { undefinedString, nullString } from './helpers'

import { lookForAll } from '../../src/string/lookForAll'


describe('string', () => {
    test('lookForAll', () => {
		expect(lookForAll(undefinedString, '')).toEqual([])
		expect(lookForAll(undefinedString, 'a')).toEqual([])
		expect(lookForAll(nullString, '')).toEqual([])
		expect(lookForAll(nullString, 'a')).toEqual([])
		
        expect(lookForAll('JoeBob', '')).toEqual([])
        expect(lookForAll('JoeBob', 'a')).toEqual([])
        expect(lookForAll('JoeBob', 'o')).toEqual([[1, 1], [4, 1]])
        expect(lookForAll('JoeBob', 'e')).toEqual([[2, 1]])
        expect(lookForAll('JoeBob', 'E')).toEqual([])
        expect(lookForAll('JoeBob', /ebo/i)).toEqual([[2, 3]])
        expect(lookForAll('JoeBob', /ebo/)).toEqual([])
        expect(lookForAll('JoeBobJoeBob', /ebo/i)).toEqual([[2, 3], [8, 3]])
        expect(lookForAll('x1x2x3x4x', /x.*?x/)).toEqual([[0, 3], [2, 3], [4, 3], [6, 3]])
        expect(lookForAll('x1x2x3x4x', /x.*?x/, true)).toEqual([[0, 3], [4, 3]])
    })
})
