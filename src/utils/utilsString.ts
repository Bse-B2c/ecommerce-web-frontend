export const minimizeTitle = (value: string, length: number) =>
	value.length < length ? value : value.slice(0, length) + '...';
