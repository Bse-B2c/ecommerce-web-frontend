import React, { FC } from 'react';
import { Grid, TextField } from '@mui/material';
import {
	Control,
	Controller,
	FieldErrors,
	UseFormRegister,
	UseFormWatch,
} from 'react-hook-form';
import TextMaskInput from '@components/MaskInput';
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface State {
	name: string;
	email: string;
	brithDate: any;
	cpf: string;
	phone: string;
}

interface CustomerFormStateProps {
	errors: FieldErrors<Partial<State>>;
}
interface CustomerFormDispatchProps {
	watch: UseFormWatch<any>;
	register: UseFormRegister<any>;
	control: Control<any>;
}

type CustomerFormProps = CustomerFormStateProps & CustomerFormDispatchProps;

const CustomerForm: FC<CustomerFormProps> = ({
	register,
	watch,
	control,
	errors,
}) => {
	return (
		<Grid container direction={'column'} item xs spacing={1}>
			<Grid item xs>
				<TextField
					{...register('name')}
					error={!!errors.name}
					helperText={errors?.name?.message}
					label="Full Name*"
					placeholder="Hector Clair"
					size="small"
					InputLabelProps={{ shrink: !!watch('name') }}
					fullWidth
				/>
			</Grid>
			<Grid item xs>
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
							InputLabelProps={{ shrink: !!watch('cpf') }}
							onAccept={(value: any) =>
								onChange({ target: { name: name, value } })
							}
						/>
					)}
				/>
			</Grid>
			<Grid item xs>
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
								//@ts-ignore
								helperText={errors?.brithDate?.message}
								size="small"
								format="DD/MM/YYYY"
								value={value}
								InputLabelProps={{ shrink: !!watch('brithDate') }}
								onChange={value => {
									onChange({ target: { name: name, value } });
								}}
							/>
						)}
					/>
				</LocalizationProvider>
			</Grid>
			<Grid item xs>
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
							InputLabelProps={{ shrink: !!watch('phone') }}
							onAccept={(value: any) =>
								onChange({ target: { name: name, value } })
							}
						/>
					)}
				/>
			</Grid>
			<Grid item xs>
				<TextField
					{...register('email')}
					error={!!errors.email}
					helperText={errors?.email?.message}
					label="E-mail*"
					placeholder="hector.clair@exemple.com"
					InputLabelProps={{ shrink: !!watch('email') }}
					size="small"
					fullWidth
				/>
			</Grid>
		</Grid>
	);
};

export default CustomerForm;
