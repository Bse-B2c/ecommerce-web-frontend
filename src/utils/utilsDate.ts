const months = [
	'Jan.',
	'Feb.',
	'Mar.',
	'Apr.',
	'May',
	'Jun.',
	'Jul.',
	'Aug.',
	'Sep.',
	'Oct.',
	'Nov.',
	'Dec.',
];
export const formatDate = (isoDate: string) => {
	const date = new Date(isoDate);
	const month = months[date.getMonth()];
	const year = date.getFullYear();
	const day = date.getDate();

	return `${day} ${month} ${year}`;
};
