import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import TextMaskInput from '@components/MaskInput';
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Check, Close } from '@mui/icons-material';
import {
	CustomerFormDto,
	messages,
} from '@components/customerForm/CustomerFormDto';
import { Dayjs } from 'dayjs';

interface CustomerFormStateProps {
	defaultValues: {
		name: string;
		email: string;
		phone: string;
		cpf: string;
		password: string;
		confirmPassword: string;
		brithDate: null | Dayjs;
	};
}
interface CustomerFormDispatchProps {
	onSubmit: <T>(data: T) => void;
}

type CustomerFormProps = CustomerFormStateProps & CustomerFormDispatchProps;

const CustomerForm: FC<CustomerFormProps> = ({ onSubmit, defaultValues }) => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(CustomerFormDto),
		criteriaMode: 'all',
		mode: 'all',
		defaultValues,
	});

	const getPasswordValidationError = () => {
		let validationErrors = [];
		const error = errors.password?.types;

		if (error && error.required) validationErrors.push(error.required);

		if (error && error.min) validationErrors.push(error.min);

		if (error && error.matches) {
			if (Array.isArray(error.matches)) validationErrors.push(...error.matches);
			else validationErrors.push(error.matches);
		}

		return validationErrors;
	};

	const validationErrors = getPasswordValidationError();
	return (
		<Grid item xs>
			<Grid
				container
				component="form"
				onSubmit={handleSubmit(onSubmit)}
				direction={'column'}
				item
				xs
				spacing={1}>
				<Grid container item xs spacing={1} wrap={'wrap'}>
					<Grid item xs={12} md={6}>
						<TextField
							{...register('name')}
							error={!!errors.name}
							helperText={errors?.name?.message}
							label="Full Name*"
							placeholder="Hector Clair"
							size="small"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<Controller
							name={'cpf'}
							control={control}
							render={({ field: { onChange, name } }) => (
								<TextMaskInput
									error={!!errors?.cpf}
									helperText={errors?.cpf?.message}
									mask={'000.000.000-00'}
									label="CPF*"
									onAccept={(value: any) =>
										onChange({ target: { name: name, value } })
									}
								/>
							)}
						/>
					</Grid>
				</Grid>
				<Grid container item xs spacing={1} wrap={'wrap'}>
					<Grid item xs={12} md={6}>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<Controller
								name={'brithDate'}
								control={control}
								render={({ field: { onChange, name, value } }) => (
									<DateField
										label="Brith Date*"
										fullWidth
										//@ts-ignore
										error={!!errors?.brithDate}
										helperText={errors?.brithDate?.message}
										size="small"
										format="DD/MM/YYYY"
										value={value}
										onChange={value => {
											onChange({ target: { name: name, value } });
										}}
									/>
								)}
							/>
						</LocalizationProvider>
					</Grid>
					<Grid item xs={12} md={6}>
						<Controller
							name={'phone'}
							control={control}
							render={({ field: { onChange, name } }) => (
								<TextMaskInput
									error={!!errors?.phone}
									helperText={errors?.phone?.message}
									mask={'(00) 00000-0000'}
									label="Phone*"
									onAccept={(value: any) =>
										onChange({ target: { name: name, value } })
									}
								/>
							)}
						/>
					</Grid>
				</Grid>
				<Grid item xs>
					<TextField
						{...register('email')}
						error={!!errors.email}
						helperText={errors?.email?.message}
						label="E-mail*"
						placeholder="hector.clair@exemple.com"
						size="small"
						fullWidth
					/>
				</Grid>
				<Grid container item xs spacing={1} wrap={'wrap'}>
					<Grid item xs={12} md={6}>
						<TextField
							error={!!errors.password}
							{...register('password')}
							label="Password*"
							type={'password'}
							size="small"
							fullWidth
						/>
						{!!errors.password
							? messages.map(message => {
									const isErrorValidation = validationErrors.includes(message);

									return (
										<Chip
											key={message}
											icon={isErrorValidation ? <Close /> : <Check />}
											size="small"
											color={isErrorValidation ? 'error' : 'success'}
											variant={'outlined'}
											label={message}
											sx={{ mr: 0.5, mt: 0.5 }}
										/>
									);
							  })
							: null}
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							{...register('confirmPassword')}
							error={!!errors.confirmPassword}
							helperText={errors?.confirmPassword?.message}
							type={'password'}
							label="Confirm your Password*"
							size="small"
							fullWidth
						/>
					</Grid>
				</Grid>
				<Grid item xs>
					<Button
						type="submit"
						size="small"
						color="primary"
						variant="contained"
						fullWidth>
						Create
					</Button>
				</Grid>
				<Grid item xs textAlign="center">
					<Typography variant="body2">Already have registration?</Typography>
					<Link href="/login">Sign in</Link>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default CustomerForm;
