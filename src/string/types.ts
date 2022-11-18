
import os from 'os'


export type LookForResult = [number, number]

export const NotFound: LookForResult = [-1, 0]

export type SplitOnceResult = [string, string] | [string]


export type Text = string | string[] | Text[]

export interface WriteOptions {
	newline: string,
	indent: string
}

export const DefaultWriteOptions: WriteOptions = {
	newline: os.EOL,
	indent: '\t'
}

export interface WriteState {
	atNewline: boolean,
	depth: number,
	text: string,
	lastCharacter?: string
}

export const DefaultWriteState: WriteState = {
	atNewline: true,
	depth: 0,
	text: ''
}

export interface WriteArgs extends WriteOptions, WriteState {
	toString(): string,
	write(...lines: Text[]): WriteArgs,
	writeLine(...lines: Text[]): WriteArgs
}

export const EOL = '\n'
export const TAB = '\t'
export const INDENT = '\f'
export const DEDENT = '\b'
export const CLEAR = '\v'
