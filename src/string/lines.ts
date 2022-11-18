
export const lines = (value: string, sep: string | RegExp = /\r?\n/): string[] =>
	value?.split(sep) ?? []

export default lines
