import React, { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	Button,
	Chip,
	CircularProgress,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	Link,
	OutlinedInput,
	TextField,
	Typography,
} from '@mui/material';
import TextMaskInput from '@components/MaskInput';
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Check, Close, Visibility, VisibilityOff } from '@mui/icons-material';
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
	isLoading: boolean;
}
interface CustomerFormDispatchProps {
	onSubmit: (data: any) => void;
}

type CustomerFormProps = CustomerFormStateProps & CustomerFormDispatchProps;

const CustomerForm: FC<CustomerFormProps> = ({
	onSubmit,
	defaultValues,
	isLoading,
}) => {
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
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] =
		useState<boolean>(false);

	const handleClickShowPassword = () => setShowPassword(show => !show);

	const handleClickShowConfirmPassword = () =>
		setShowConfirmPassword(show => !show);

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
							render={({ field: { onChange, name, value } }) => (
								<TextMaskInput
									error={!!errors?.cpf}
									helperText={errors?.cpf?.message}
									mask={'000.000.000-00'}
									label="CPF*"
									value={value}
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
							render={({ field: { onChange, name, value } }) => (
								<TextMaskInput
									error={!!errors?.phone}
									helperText={errors?.phone?.message}
									mask={'(00) 00000-0000'}
									label="Phone*"
									value={value}
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
						<FormControl fullWidth>
							<InputLabel
								error={!!errors?.email?.message}
								htmlFor={'outlined-password'}
								size={'small'}>
								Password*
							</InputLabel>
							<OutlinedInput
								id={'outlined-password'}
								error={!!errors.password}
								{...register('password')}
								label="Password*"
								size="small"
								fullWidth
								type={showPassword ? 'text' : 'password'}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											edge="end">
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
							/>
						</FormControl>
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
						<FormControl fullWidth>
							<InputLabel
								error={!!errors?.email?.message}
								htmlFor={'outlined-confirm-password'}
								size={'small'}>
								Confirm your Password*
							</InputLabel>
							<OutlinedInput
								id="outlined-confirm-password"
								{...register('confirmPassword')}
								error={!!errors.confirmPassword}
								label="Confirm your Password*"
								size="small"
								type={showConfirmPassword ? 'text' : 'password'}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowConfirmPassword}
											edge="end">
											{showConfirmPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
								fullWidth
							/>
							{!!errors?.confirmPassword && (
								<Typography
									variant={'body2'}
									fontSize={12}
									color={'red'}
									sx={{ mt: 1 }}>
									{errors?.confirmPassword?.message}
								</Typography>
							)}
						</FormControl>
					</Grid>
				</Grid>
				<Grid item xs>
					<Button
						type="submit"
						size="small"
						color="primary"
						variant="contained"
						fullWidth>
						{!isLoading ? (
							<span>Create</span>
						) : (
							<CircularProgress color={'inherit'} size={25} />
						)}
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
