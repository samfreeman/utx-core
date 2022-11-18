
import { undefinedString, nullString } from './helpers'

import { first } from '../../src/string/first'


describe('string', () => {
    test('first', () => {
		expect(first(undefinedString, 1)).toBe(undefinedString)
		expect(first(nullString, 1)).toBe(nullString)
		
        expect(first('')).toBe('')
        expect(first('JoeBob')).toBe('J')
        expect(first('JoeBob', -7)).toBe('')
        expect(first('JoeBob', -6)).toBe('')
        expect(first('JoeBob', -5)).toBe('J')
        expect(first('JoeBob', -4)).toBe('Jo')
        expect(first('JoeBob', -3)).toBe('Joe')
        expect(first('JoeBob', -2)).toBe('JoeB')
        expect(first('JoeBob', -1)).toBe('JoeBo')
        expect(first('JoeBob', 0)).toBe('')
        expect(first('JoeBob', 1)).toBe('J')
        expect(first('JoeBob', 2)).toBe('Jo')
        expect(first('JoeBob', 3)).toBe('Joe')
        expect(first('JoeBob', 4)).toBe('JoeB')
        expect(first('JoeBob', 5)).toBe('JoeBo')
        expect(first('JoeBob', 6)).toBe('JoeBob')
        expect(first('JoeBob', 7)).toBe('JoeBob')
    })
})
