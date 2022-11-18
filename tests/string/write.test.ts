
import {
    DefaultWriteOptions,
    DefaultWriteState,
    EOL,
    DEDENT,
    CLEAR,
    TAB,
} from '../../src/string/types'

import { write, writeLine, writer } from '../../src/string/write'


describe('string', () => {
    const eol = DefaultWriteOptions.newline
    const tab = DefaultWriteOptions.indent

    test('write', () => {
        let state = write()
        expect(state.newline).toBe(DefaultWriteOptions.newline)
        expect(state.indent).toBe(DefaultWriteOptions.indent)
        expect(state.atNewline).toBe(DefaultWriteState.atNewline)
        expect(state.depth).toBe(DefaultWriteState.depth)
        expect(state.text).toBe(DefaultWriteState.text)
        expect(state.lastCharacter).toBe(DefaultWriteState.lastCharacter)

        state = write('Joe')
        expect(state.atNewline).toBe(false)
        expect(state.depth).toBe(0)
        expect(state.text).toBe(`Joe`)
        expect(state.lastCharacter).toBe('e')
        expect(state.toString()).toBe(`Joe`)
        expect(`${state}`).toBe(`Joe`)

        state = write()
        expect(state.atNewline).toBe(DefaultWriteState.atNewline)
        expect(state.depth).toBe(DefaultWriteState.depth)
        expect(state.text).toBe(DefaultWriteState.text)
        expect(state.lastCharacter).toBe(DefaultWriteState.lastCharacter)

        state = write('Joe', 'Bob')
        expect(state.atNewline).toBe(false)
        expect(state.depth).toBe(0)
        expect(state.text).toBe(`Joe${eol}Bob`)
        expect(state.lastCharacter).toBe('b')

        state = write('Joe', 'Bob\n')
        expect(state.atNewline).toBe(true)
        expect(state.depth).toBe(0)
        expect(state.text).toBe(`Joe${eol}Bob${eol}`)
        expect(state.lastCharacter).toBe(EOL)

        state = write(['Joe'])
        expect(state.atNewline).toBe(true)
        expect(state.depth).toBe(0)
        expect(state.text).toBe(`${tab}Joe${eol}`)
        expect(state.lastCharacter).toBe(DEDENT)

        state = write(['Joe', 'Bob'])
        expect(state.atNewline).toBe(true)
        expect(state.depth).toBe(0)
        expect(state.text).toBe(`${tab}Joe${eol}${tab}Bob${eol}`)
        expect(state.lastCharacter).toBe(DEDENT)

        state = write(`Joe\nBob`)
        expect(state.atNewline).toBe(false)
        expect(state.depth).toBe(0)
        expect(state.text).toBe(`Joe${eol}Bob`)
        expect(state.lastCharacter).toBe('b')

        state = write(`Joe\nBob`)
        expect(state.atNewline).toBe(false)
        expect(state.depth).toBe(0)
        expect(state.text).toBe(`Joe${eol}Bob`)
        expect(state.lastCharacter).toBe('b')

        state = write(
            'class Test {\f',
            'private _name: string',
            'constructor(name: string) {\f',
            'this._name = name\b',
            '}',
            'get name() { return this._name }',
            'set name(name: string) { this._name = name }\b',
            '}')
        expect(state.atNewline).toBe(false)
        expect(state.depth).toBe(0)
        expect(state.text).toBe(
            `class Test {${eol}` +
            `${tab}private _name: string${eol}` +
            `${tab}constructor(name: string) {${eol}` +
            `${tab}${tab}this._name = name${eol}` +
            `${tab}}${eol}` +
            `${tab}get name() { return this._name }${eol}` +
            `${tab}set name(name: string) { this._name = name }${eol}` +
            `}`)
        expect(state.lastCharacter).toBe('}')

        state = state.write(CLEAR)
        expect(state.newline).toBe(DefaultWriteOptions.newline)
        expect(state.indent).toBe(DefaultWriteOptions.indent)
        expect(state.atNewline).toBe(DefaultWriteState.atNewline)
        expect(state.depth).toBe(DefaultWriteState.depth)
        expect(state.text).toBe(DefaultWriteState.text)
        expect(state.lastCharacter).toBe(CLEAR)

        state = write(
            'class Test {', [
                'private _name: string',
                'constructor(name: string) {', [
                    'this._name = name',
                ], '}',
                'get name() { return this._name }',
                'set name(name: string) { this._name = name }',
            ], '}')
        expect(state.atNewline).toBe(false)
        expect(state.depth).toBe(0)
        expect(state.text).toBe(
            `class Test {${eol}` +
            `${tab}private _name: string${eol}` +
            `${tab}constructor(name: string) {${eol}` +
            `${tab}${tab}this._name = name${eol}` +
            `${tab}}${eol}` +
            `${tab}get name() { return this._name }${eol}` +
            `${tab}set name(name: string) { this._name = name }${eol}` +
            `}`)
        expect(state.lastCharacter).toBe('}')

        state = write('Joe').write('Bob')
        expect(state.atNewline).toBe(false)
        expect(state.depth).toBe(0)
        expect(state.text).toBe(`JoeBob`)
        expect(state.lastCharacter).toBe('b')

        state = state.write(TAB)
        expect(state.atNewline).toBe(false)
        expect(state.depth).toBe(0)
        expect(state.text).toBe(`JoeBob${tab}`)
        expect(state.lastCharacter).toBe(TAB)
    })

    test('writeLine', () => {
        let state = writeLine()
        expect(state.newline).toBe(DefaultWriteOptions.newline)
        expect(state.indent).toBe(DefaultWriteOptions.indent)
        expect(state.atNewline).toBe(true)
        expect(state.depth).toBe(0)
        expect(state.text).toBe(eol)
        expect(state.lastCharacter).toBe(EOL)

        state = writeLine('Joe')
        expect(state.atNewline).toBe(true)
        expect(state.depth).toBe(0)
        expect(state.text).toBe(`Joe${eol}`)
        expect(state.lastCharacter).toBe(EOL)
        expect(state.toString()).toBe(`Joe${eol}`)
        expect(`${state}`).toBe(`Joe${eol}`)

        state = writeLine()
        expect(state.atNewline).toBe(DefaultWriteState.atNewline)
        expect(state.depth).toBe(DefaultWriteState.depth)
        expect(state.text).toBe(eol)
        expect(state.lastCharacter).toBe(EOL)

        state = writeLine('Joe', 'Bob')
        expect(state.atNewline).toBe(true)
        expect(state.depth).toBe(0)
        expect(state.text).toBe(`Joe${eol}Bob${eol}`)
        expect(state.lastCharacter).toBe(EOL)

        state = writeLine('Joe', 'Bob\n')
        expect(state.atNewline).toBe(true)
        expect(state.depth).toBe(0)
        expect(state.text).toBe(`Joe${eol}Bob${eol}${eol}`)
        expect(state.lastCharacter).toBe(EOL)

        state = writeLine(['Joe'])
        expect(state.atNewline).toBe(true)
        expect(state.depth).toBe(0)
        expect(state.text).toBe(`${tab}Joe${eol}`)
        expect(state.lastCharacter).toBe(DEDENT)

        state = writeLine(['Joe', 'Bob'])
        expect(state.atNewline).toBe(true)
        expect(state.depth).toBe(0)
        expect(state.text).toBe(`${tab}Joe${eol}${tab}Bob${eol}`)
        expect(state.lastCharacter).toBe(DEDENT)

        state = writeLine(`Joe\nBob`)
        expect(state.atNewline).toBe(true)
        expect(state.depth).toBe(0)
        expect(state.text).toBe(`Joe${eol}Bob${eol}`)
        expect(state.lastCharacter).toBe(EOL)

        state = writeLine(`Joe\nBob`)
        expect(state.atNewline).toBe(true)
        expect(state.depth).toBe(0)
        expect(state.text).toBe(`Joe${eol}Bob${eol}`)
        expect(state.lastCharacter).toBe(EOL)

        state = writeLine(
            'class Test {\f',
            'private _name: string',
            'constructor(name: string) {\f',
            'this._name = name\b',
            '}',
            'get name() { return this._name }',
            'set name(name: string) { this._name = name }\b',
            '}')
        expect(state.atNewline).toBe(true)
        expect(state.depth).toBe(0)
        expect(state.text).toBe(
            `class Test {${eol}` +
            `${tab}private _name: string${eol}` +
            `${tab}constructor(name: string) {${eol}` +
            `${tab}${tab}this._name = name${eol}` +
            `${tab}}${eol}` +
            `${tab}get name() { return this._name }${eol}` +
            `${tab}set name(name: string) { this._name = name }${eol}` +
            `}${eol}`)
        expect(state.lastCharacter).toBe(EOL)

        state = writeLine(
            'class Test {', [
            'private _name: string',
            'constructor(name: string) {', [
                'this._name = name',
            ], '}',
            'get name() { return this._name }',
            'set name(name: string) { this._name = name }',
        ], '}')
        expect(state.atNewline).toBe(true)
        expect(state.depth).toBe(0)
        expect(state.text).toBe(
            `class Test {${eol}` +
            `${tab}private _name: string${eol}` +
            `${tab}constructor(name: string) {${eol}` +
            `${tab}${tab}this._name = name${eol}` +
            `${tab}}${eol}` +
            `${tab}get name() { return this._name }${eol}` +
            `${tab}set name(name: string) { this._name = name }${eol}` +
            `}${eol}`)
        expect(state.lastCharacter).toBe(EOL)

        state = writeLine('Joe').writeLine('Bob')
        expect(state.atNewline).toBe(true)
        expect(state.depth).toBe(0)
        expect(state.text).toBe(`Joe${eol}Bob${eol}`)
        expect(state.lastCharacter).toBe(EOL)
    })

    test('writer', () => {
        const eol = '\r\n'
        const tab = '  '
        const w = writer({ newline: eol, indent: tab })
        expect(w).toBeInstanceOf(Function)
        const actual = w(
            'class Test {', [
                'private _name: string',
                'constructor(name: string) {', [
                    'this._name = name',
                ], '}',
                'get name() { return this._name }',
                'set name(name: string) { this._name = name }',
            ], '}')
        expect(actual).toBe(
            `class Test {${eol}` +
            `${tab}private _name: string${eol}` +
            `${tab}constructor(name: string) {${eol}` +
            `${tab}${tab}this._name = name${eol}` +
            `${tab}}${eol}` +
            `${tab}get name() { return this._name }${eol}` +
            `${tab}set name(name: string) { this._name = name }${eol}` +
            `}`)
    })
})
