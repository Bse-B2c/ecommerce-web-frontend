const months = [
	'Jan.',
	'Feb.',
	'Mar.',
	'Apr.',
	'May',
	'June',
	'July',
	'Aug.',
	'Sept.',
	'Oct.',
	'Nov.',
	'Dec.',
];
export const formatDate = (isoDate: string) => {
	const date = new Date(isoDate);
	const month = months[date.getMonth()];
	const year = date.getFullYear();
	const day = date.getDay();

	return `${day} ${month} ${year}`;
};
