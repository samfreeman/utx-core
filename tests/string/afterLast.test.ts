
import { undefinedString, nullString } from './helpers'

import { afterLast } from '../../src/string/afterLast'


describe('string', () => {
    test('afterLast', () => {
		expect(afterLast(undefinedString, '')).toBe(undefinedString)
		expect(afterLast(nullString, '')).toBe(nullString)

        expect(afterLast('', '')).toBe('')
        expect(afterLast('', 'a')).toBe('')
        expect(afterLast('JoeBob', '')).toBe('JoeBob')
        expect(afterLast('JoeBob', 'a')).toBe('JoeBob')
        expect(afterLast('JoeBob', 'o')).toBe('b')
        expect(afterLast('JoeBob', 'B')).toBe('ob')
        expect(afterLast('JoeBob', 'E')).toBe('JoeBob')
        expect(afterLast('JoeBob', /ebo/i)).toBe('b')
        expect(afterLast('JoeBob', /ebo/)).toBe('JoeBob')
    })
})
