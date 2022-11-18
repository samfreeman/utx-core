
import { undefinedString, nullString } from './helpers'

import { beforeLast } from '../../src/string/beforeLast'


describe('string', () => {
	test('beforeLast', () => {
		expect(beforeLast(undefinedString, '')).toBe(undefinedString)
		expect(beforeLast(undefinedString, 'a')).toBe(undefinedString)
		expect(beforeLast(nullString, '')).toBe(nullString)
		expect(beforeLast(nullString, 'a')).toBe(nullString)
        
        expect(beforeLast('', '')).toBe('')
        expect(beforeLast('', 'a')).toBe('')
        expect(beforeLast('JoeBob', '')).toBe('JoeBob')
        expect(beforeLast('JoeBob', 'a')).toBe('JoeBob')
        expect(beforeLast('JoeBob', 'o')).toBe('JoeB')
        expect(beforeLast('JoeBob', 'B')).toBe('Joe')
        expect(beforeLast('JoeBob', 'E')).toBe('JoeBob')
        expect(beforeLast('JoeBob', /ebo/i)).toBe('Jo')
        expect(beforeLast('JoeBob', /ebo/)).toBe('JoeBob')
    })
})
