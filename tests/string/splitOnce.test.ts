
import { undefinedString, nullString } from './helpers'

import { splitOnce } from '../../src/string/splitOnce'


describe('string', () => {
    test('splitOnce', () => {
		expect(splitOnce(undefinedString, 'a')).toStrictEqual([undefinedString])
		expect(splitOnce(nullString, 'a')).toStrictEqual([nullString])

        expect(splitOnce('', '')).toEqual([''])
        expect(splitOnce('', 'a')).toEqual([''])
        expect(splitOnce('JoeBob', '')).toEqual(['JoeBob'])
        expect(splitOnce('JoeBob', 'a')).toEqual(['JoeBob'])
        expect(splitOnce('JoeBob', 'o')).toEqual(['J', 'eBob'])
        expect(splitOnce('JoeBob', 'o', true)).toEqual(['JoeB', 'b'])
        expect(splitOnce('JoeBob', 'e')).toEqual(['Jo', 'Bob'])
        expect(splitOnce('JoeBob', 'E')).toEqual(['JoeBob'])
        expect(splitOnce('JoeBob', /ebo/i)).toEqual(['Jo', 'b'])
        expect(splitOnce('JoeBob', /ebo/)).toEqual(['JoeBob'])
    })
})
