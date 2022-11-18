
import {
	DefaultWriteOptions,
	DefaultWriteState,
	EOL,
	TAB,
	INDENT,
	DEDENT,
	CLEAR,
	Text,
	WriteArgs,
	WriteState
} from './types'


const DefaultWriteArgs: WriteArgs = {
	...DefaultWriteOptions,
	...DefaultWriteState,
	toString() { return this.text },
	write(...lines: Text[]) { return write(this, ...lines) },
	writeLine(...lines: Text[]) { return writeLine(this, ...lines) }
}


const _write = (
	s: string,
	args?: Partial<WriteArgs>
): WriteArgs => {
	const { newline, indent } = {
		...DefaultWriteOptions,
		...args
	}

	const state: WriteState = {
		...DefaultWriteState,
		...args
	}

	let index = 0
	while (index < s.length) {
		if (s.startsWith(CLEAR, index)) {
			state.text = DefaultWriteState.text
			state.atNewline = DefaultWriteState.atNewline
			state.depth = DefaultWriteState.depth
			state.lastCharacter = CLEAR
			index += CLEAR.length
		}
		else if (s.startsWith(EOL, index)) {
			state.atNewline = true
			state.text += newline
			state.lastCharacter = EOL
			index += EOL.length
		}
		else if (s.startsWith(INDENT, index)) {
			if (!state.atNewline) {
				state.atNewline = true
				state.text += newline
			}
			state.depth++
			state.lastCharacter = INDENT
			index += INDENT.length
		}
		else if (s.startsWith(DEDENT, index)) {
			if (!state.atNewline) {
				state.atNewline = true
				state.text += newline
			}
			if (state.depth > 0)
				state.depth--
			state.lastCharacter = DEDENT
			index += DEDENT.length
		}
		else {
			if (state.atNewline) {
				state.atNewline = false
				state.text += indent.repeat(state.depth)
			}

			if (s.startsWith(TAB, index)) {
				state.text += indent
				state.lastCharacter = TAB
				index += TAB.length
			}
			else {
				state.text += s[index]
				state.lastCharacter = s[index]
				index++
			}
		}
	}

	return {
		...DefaultWriteArgs,
		...state,
		newline,
		indent
	}
}


const lastCharacterIsIndentOrDedent = (args: WriteArgs): boolean =>
	args.lastCharacter == INDENT || args.lastCharacter == DEDENT


export const write = (state?: Partial<WriteArgs> | Text, ...lines: Text[]): WriteArgs => {
	let result: WriteArgs = DefaultWriteArgs
	if (typeof state == 'string' || Array.isArray(state))
		lines = [state, ...lines]
	else if (state)
		result = _write('', state)

	lines.forEach((line, index) => {
		if (Array.isArray(line)) {
			result = _write(INDENT, result)
			result = write(result, ...line)
			result = _write(DEDENT, result)
		}
		else {
			result = line == CLEAR
				? _write(CLEAR, result)
				: _write(line, result)
			if (index < lines.length - 1 && !lastCharacterIsIndentOrDedent(result))
				result = _write(EOL, result)
		}
	})

	return result
}

export const writeLine = (state?: Partial<WriteArgs> | Text, ...lines: Text[]): WriteArgs => {
	let result = write(state, ...lines)
	if (!lastCharacterIsIndentOrDedent(result))
		result = _write(EOL, result)
	return result
}

export const writer = (args?: Partial<WriteArgs>) =>
	(...lines: Text[]): string => write({...DefaultWriteArgs, ...args}, ...lines).text
