
export const first = (value: string, count?: number): string =>
	value?.slice(0, count ?? 1) ?? value

export default first
