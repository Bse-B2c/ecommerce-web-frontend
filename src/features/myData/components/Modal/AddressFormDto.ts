import { object, string } from 'yup';

export const AddressFormDto = object().shape({
	zipCode: string()
		.max(8, 'Zip Code is not valid')
		.required('Zip Code is required'),
	streetName: string().required('Street Name is required'),
	houseNumber: string().required('House Number is requied'),
	apartment: string()
		.max(15, 'Exceeded Maximum 15 characters')
		.required('Apartment is required'),
	city: string().required('City is required'),
	district: string().required('District is required'),
	country: string().required('Country is required'),
});
