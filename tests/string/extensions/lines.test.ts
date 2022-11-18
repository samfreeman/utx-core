
import { undefinedString, nullString } from '../helpers'

import '../../../src/string/extensions/lines'


describe('string-extensions', () => {
	test('lines', () => {
		expect(() => undefinedString.lines())
			.toThrow(`Cannot read properties of undefined (reading 'lines')`)
		expect(() => nullString.lines())
			.toThrow(`Cannot read properties of null (reading 'lines')`)

        expect(''.lines()).toEqual([''])
        expect('a'.lines()).toEqual(['a'])
        expect('a\nb'.lines()).toEqual(['a', 'b'])
        expect('a\r\nb'.lines()).toEqual(['a', 'b'])
        expect('a\nb\r\nc'.lines()).toEqual(['a', 'b', 'c'])
        expect('a\nb\r\nc'.lines('\n')).toEqual(['a', 'b\r', 'c'])
	})
})
