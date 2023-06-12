export const getServiceHost = (name: string): string =>
	import.meta.env[`VITE_${name.toUpperCase()}_SERVICE`] ??
	'localhttp://localhost:3000';
