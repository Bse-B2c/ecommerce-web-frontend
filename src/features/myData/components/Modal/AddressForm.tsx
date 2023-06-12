import { Grid, TextField } from '@mui/material';
import React, { FC } from 'react';
import { UseFormWatch, UseFormRegister, FieldErrors } from 'react-hook-form';

interface State {
	zipCode: string;
	streetName: string;
	houseNumber: string;
	apartment: string;
	city: string;
	district: string;
	country: string;
}

interface AddressFormStateProps {
	errors: FieldErrors<Partial<State>>;
}
interface AddressFormDispatchProps {
	watch: UseFormWatch<any>;
	register: UseFormRegister<any>;
	onCheckZipCode: (e: any) => void;
}

type AddressFormProps = AddressFormStateProps & AddressFormDispatchProps;

const AddressForm: FC<AddressFormProps> = ({
	watch,
	register,
	errors,
	onCheckZipCode,
}) => {
	return (
		<Grid container direction={'column'} spacing={1} wrap={'wrap'}>
			<Grid item xs={12} md={4}>
				<TextField
					{...register('zipCode')}
					error={!!errors.zipCode}
					helperText={errors?.zipCode?.message}
					size="small"
					fullWidth
					placeholder="22470180"
					label="Zip Code"
					onBlur={onCheckZipCode}
					InputLabelProps={{ shrink: !!watch('zipCode') }}
				/>
			</Grid>
			<Grid item xs>
				<TextField
					{...register('streetName')}
					fullWidth
					error={!!errors.streetName}
					helperText={errors?.streetName?.message}
					size="small"
					margin="dense"
					placeholder="Rua Jardim Botânico"
					label="Street Name"
					InputLabelProps={{ shrink: !!watch('streetName') }}
				/>
			</Grid>
			<Grid item xs>
				<TextField
					{...register('houseNumber')}
					error={!!errors.houseNumber}
					helperText={errors?.houseNumber?.message}
					size="small"
					fullWidth
					placeholder="1008"
					label="House Number"
					InputLabelProps={{ shrink: !!watch('houseNumber') }}
				/>
			</Grid>
			<Grid item xs>
				<TextField
					{...register('apartment')}
					error={!!errors.apartment}
					helperText={errors?.apartment?.message}
					size="small"
					fullWidth
					placeholder="Jardim Botânico"
					label="Apartment"
					InputLabelProps={{ shrink: !!watch('apartment') }}
				/>
			</Grid>

			<Grid item xs>
				<TextField
					{...register('city')}
					error={!!errors.city}
					helperText={errors?.city?.message}
					size="small"
					fullWidth
					placeholder="Rio de Janeiro"
					label="City"
					InputLabelProps={{ shrink: !!watch('city') }}
				/>
			</Grid>
			<Grid item xs>
				<TextField
					{...register('district')}
					error={!!errors.district}
					helperText={errors?.district?.message}
					size="small"
					fullWidth
					placeholder="Jardim Botânico"
					label="District"
					InputLabelProps={{ shrink: !!watch('district') }}
				/>
			</Grid>
			<Grid item xs>
				<TextField
					{...register('country')}
					error={!!errors.country}
					helperText={errors?.country?.message}
					size="small"
					fullWidth
					placeholder="Brasil"
					label="Country"
					InputLabelProps={{ shrink: !!watch('country') }}
				/>
			</Grid>
		</Grid>
	);
};

export default AddressForm;
