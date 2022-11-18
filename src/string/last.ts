

export const last = (value: string, count?: number): string =>
	count == 0 ? '' : value?.slice(-(count ?? 1)) ?? value

export default last
