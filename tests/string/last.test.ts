
import { undefinedString, nullString } from './helpers'

import { last } from '../../src/string/last'


describe('string', () => {
    test('last', () => {
		expect(last(undefinedString, 1)).toBe(undefinedString)
		expect(last(nullString, 1)).toBe(nullString)

        expect(last('')).toBe('')
        expect(last('JoeBob')).toBe('b')
        expect(last('JoeBob', -7)).toBe('')
        expect(last('JoeBob', -6)).toBe('')
        expect(last('JoeBob', -5)).toBe('b')
        expect(last('JoeBob', -4)).toBe('ob')
        expect(last('JoeBob', -3)).toBe('Bob')
        expect(last('JoeBob', -2)).toBe('eBob')
        expect(last('JoeBob', -1)).toBe('oeBob')
        expect(last('JoeBob', 0)).toBe('')
        expect(last('JoeBob', 1)).toBe('b')
        expect(last('JoeBob', 2)).toBe('ob')
        expect(last('JoeBob', 3)).toBe('Bob')
        expect(last('JoeBob', 4)).toBe('eBob')
        expect(last('JoeBob', 5)).toBe('oeBob')
        expect(last('JoeBob', 6)).toBe('JoeBob')
        expect(last('JoeBob', 7)).toBe('JoeBob')
    })
})
