import { date, object, ref, string } from 'yup';

export const messages = [
	'At least 8 character',
	'One lowercase character',
	'One uppercase character',
	'One special character',
	'Password is required',
	'One number',
];

const password = {
	lowerCaseRegex: {
		value: new RegExp('.*[a-z].*'),
		message: 'One lowercase character',
	},
	upperCaseRegex: {
		value: new RegExp('.*[A-Z].*'),
		message: 'One uppercase character',
	},
	numberRegex: { value: new RegExp('.*\\d.*'), message: 'One number' },
	specialCharacterRegex: {
		value: new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
		message: 'One special character',
	},
	minLength: { value: 8, message: 'At least 8 character' },
};
const cpf = {
	valid: {
		value: new RegExp(/^\d{3}.\d{3}.\d{3}-\d{2}$/g),
		message: 'CPF is not Valid',
	},
};
const phone = {
	valid: {
		value: /\(\d{2,}\) \d{5,}\-\d{4}/g,
		message: 'Phone is not Valid',
	},
};

export const CustomerFormDto = object().shape({
	brithDate: date()
		.max(new Date(), 'Birth date cannot be greater than the current date')
		.required('Brirth date is required')
		.typeError('Date is not correct'),
	name: string().required('Name is required'),
	phone: string()
		.matches(phone.valid.value, phone.valid.message)
		.required('Phone is required'),
	cpf: string()
		.matches(cpf.valid.value, cpf.valid.message)
		.required('CPF is required'),
	email: string().email('E-mail is not valid').required('E-mail is required'),
	password: string()
		.matches(password.lowerCaseRegex.value, password.lowerCaseRegex.message)
		.matches(password.upperCaseRegex.value, password.upperCaseRegex.message)
		.matches(password.numberRegex.value, password.numberRegex.message)
		.matches(
			password.specialCharacterRegex.value,
			password.specialCharacterRegex.message
		)
		.min(password.minLength.value, password.minLength.message)
		.required('Password is required'),
	confirmPassword: string()
		.required('Password Confirmation is required')
		.oneOf([ref('password'), ''], 'Passwords must match'),
});
