
import { undefinedString, nullString } from './helpers'

import { after } from '../../src/string/after'


describe('string', () => {
    test('after', () => {
		expect(after(undefinedString, '')).toBe(undefinedString)
		expect(after(undefinedString, 'a')).toBe(undefinedString)
		expect(after(nullString, '')).toBe(nullString)
		expect(after(nullString, 'a')).toBe(nullString)
		
        expect(after('', '')).toBe('')
        expect(after('', 'a')).toBe('')
        expect(after('JoeBob', '')).toBe('JoeBob')
        expect(after('JoeBob', 'a')).toBe('JoeBob')
        expect(after('JoeBob', 'o')).toBe('eBob')
        expect(after('JoeBob', 'e')).toBe('Bob')
        expect(after('JoeBob', 'E')).toBe('JoeBob')
        expect(after('JoeBob', /ebo/i)).toBe('b')
        expect(after('JoeBob', /ebo/)).toBe('JoeBob')

        expect(after((() => {}).toString(), '(')).toBe(') => { }')
    })
})
