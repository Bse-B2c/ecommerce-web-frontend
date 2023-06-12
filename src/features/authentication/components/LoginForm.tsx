import React, { FC, useState } from 'react';
import {
	CircularProgress,
	Button,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	Link,
	OutlinedInput,
	Typography,
	Alert,
} from '@mui/material';
import { Visibility, VisibilityOff, Email } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { setTokens } from '@features/authentication';
import { ApiResponse } from '@src/model/ApiResponse';
import { useNavigate } from 'react-router-dom';
import { useLazyGetMeQuery, useLoginMutation } from '@store/api/accountApi';

interface LoginFormStateProps {}
interface LoginFormDispatchProps {}

type LoginFormProps = LoginFormStateProps & LoginFormDispatchProps;

const LoginForm: FC<LoginFormProps> = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
	});
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [login, { isLoading, error, isError }] = useLoginMutation();
	const [getMe] = useLazyGetMeQuery();
	let alert: JSX.Element | null = null;

	const handleClickShowPassword = () => setShowPassword(show => !show);

	const onSubmit = handleSubmit(async ({ email, password }) => {
		try {
			const { token, refreshToken } = await login({ email, password }).unwrap();

			setTokens({ token, refreshToken: refreshToken?.key || '' });
			navigate('/');
			getMe();
		} catch (e) {}
	});

	if (isError && error) {
		const { data } = error as unknown as { data: ApiResponse<unknown> };

		alert = (
			<Grid item xs>
				<Alert severity="error">{data.error?.message}</Alert>
			</Grid>
		);
	}

	return (
		<Grid
			container
			component="form"
			onSubmit={onSubmit}
			direction={'column'}
			item
			xs
			spacing={1}>
			<Grid item xs>
				<FormControl fullWidth>
					<InputLabel
						error={!!errors?.email?.message}
						htmlFor={'outlined-email'}
						size={'small'}>
						E-mail *
					</InputLabel>
					<OutlinedInput
						error={!!errors?.email?.message}
						fullWidth
						{...register('email', {
							required: { value: true, message: 'E-mail is required' },
							pattern: {
								value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
								message: 'Email is not valid',
							},
						})}
						name={'email'}
						id={'outlined-email'}
						label="E-mail"
						type={'email'}
						size={'small'}
						endAdornment={
							<InputAdornment position="end" disablePointerEvents>
								<IconButton aria-label="email icon" edge="end">
									<Email />
								</IconButton>
							</InputAdornment>
						}
					/>
					{!!errors?.email?.message && (
						<Typography variant={'body2'} color={'red'} sx={{ mt: 1 }}>
							{errors.email.message}
						</Typography>
					)}
				</FormControl>
			</Grid>
			<Grid item xs>
				<FormControl fullWidth>
					<InputLabel
						htmlFor={'outlined-password'}
						size={'small'}
						error={!!errors?.password?.message}>
						Password *
					</InputLabel>
					<OutlinedInput
						fullWidth
						{...register('password', {
							required: { value: true, message: 'Password is required' },
						})}
						error={!!errors?.password?.message}
						name={'password'}
						size={'small'}
						id={'outlined-password'}
						label="Password"
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
					{!!errors?.password?.message && (
						<Typography variant={'body2'} color={'red'} sx={{ mt: 1 }}>
							{errors.password.message}
						</Typography>
					)}
				</FormControl>
			</Grid>
			<Grid item xs>
				<Link href="#" variant="body2">
					Forgot password?
				</Link>
			</Grid>
			<Grid item xs>
				<Button
					type={'submit'}
					fullWidth
					variant={'contained'}
					color={'primary'}>
					{!isLoading ? (
						<span>Sign In</span>
					) : (
						<CircularProgress color={'inherit'} size={25} />
					)}
				</Button>
			</Grid>
			<Grid item xs textAlign={'center'}>
				<Link href="/signup" variant="body2">
					Sign Up
				</Link>
			</Grid>
			{alert}
		</Grid>
	);
};

export default LoginForm;
