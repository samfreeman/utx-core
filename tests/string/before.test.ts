
import { undefinedString, nullString } from './helpers'
import { before } from '../../src/string/before'


describe('string', () => {
    test('before', () => {
		expect(before(undefinedString, '')).toBe(undefinedString)
		expect(before(undefinedString, 'a')).toBe(undefinedString)
		expect(before(nullString, '')).toBe(nullString)
		expect(before(nullString, 'a')).toBe(nullString)
		
        expect(before('', '')).toBe('')
        expect(before('', 'a')).toBe('')
        expect(before('JoeBob', '')).toBe('JoeBob')
        expect(before('JoeBob', 'a')).toBe('JoeBob')
        expect(before('JoeBob', 'o')).toBe('J')
        expect(before('JoeBob', 'B')).toBe('Joe')
        expect(before('JoeBob', 'E')).toBe('JoeBob')
        expect(before('JoeBob', /ebo/i)).toBe('Jo')
        expect(before('JoeBob', /ebo/)).toBe('JoeBob')

        expect(before((() => { }).toString(), ')')).toBe('(')
    })
})
