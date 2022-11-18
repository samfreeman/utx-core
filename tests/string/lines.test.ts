
import { undefinedString, nullString } from './helpers'

import { lines } from '../../src/string/lines'


describe('string', () => {
    test('lines', () => {
		expect(lines(undefinedString)).toStrictEqual([])
		expect(lines(nullString)).toStrictEqual([])
		
        expect(lines('')).toEqual([''])
        expect(lines('a')).toEqual(['a'])
        expect(lines('a\nb')).toEqual(['a', 'b'])
        expect(lines('a\r\nb')).toEqual(['a', 'b'])
        expect(lines('a\nb\r\nc')).toEqual(['a', 'b', 'c'])
        expect(lines('a\nb\r\nc', '\n')).toEqual(['a', 'b\r', 'c'])
    })
})
