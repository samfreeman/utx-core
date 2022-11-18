
import { DefaultWriteOptions, TAB, EOL } from '../../../src/string/types'
import '../../../src/string/extensions/write'


describe('string-extensions', () => {
	test('write', () => {
		let eol = DefaultWriteOptions.newline
		let tab = DefaultWriteOptions.indent

		const s = `Hello${EOL}${TAB}world!`
		expect(s.write().toString()).toBe(`Hello${eol}${tab}world!`)
		expect(s.write('Joe').toString()).toBe(`Hello${eol}${tab}world!Joe`)

		eol = '\r\n'
		tab = '    '
		expect(s.write({ newline: eol, indent: tab }, 'Joe').toString())
			.toBe(`Hello${eol}${tab}world!Joe`)
	})

	test('writeLine', () => {
		let eol = DefaultWriteOptions.newline
		let tab = DefaultWriteOptions.indent

		const s = `Hello${EOL}${TAB}world!`
		expect(s.writeLine().toString()).toBe(`Hello${eol}${tab}world!${eol}`)
		expect(s.writeLine('Joe').toString()).toBe(`Hello${eol}${tab}world!Joe${eol}`)

		eol = '\r\n'
		tab = '    '
		expect(s.writeLine({ newline: eol, indent: tab }, 'Joe').toString())
			.toBe(`Hello${eol}${tab}world!Joe${eol}`)
	})
})
