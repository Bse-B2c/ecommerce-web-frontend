import React, { FC } from 'react';
import { Card, CardContent, Grid, IconButton, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { formatDate } from '@utils/utilsDate';

interface CustomerInfoStateProps {
	id: number;
	name: string;
	email: string;
	phone: string;
	cpf: string;
	brithDate: string;
	mainAddress?: string;
}
interface CustomerInfoDispatchProps {
	onEdit?: (id: number) => void;
}

type CustomerInfoProps = CustomerInfoStateProps & CustomerInfoDispatchProps;

const CustomerInfo: FC<CustomerInfoProps> = ({
	id,
	name,
	email,
	cpf,
	phone,
	brithDate,
	mainAddress,
	onEdit,
}) => {
	const labelColor = 'text.secondary';
	return (
		<Card variant={'outlined'}>
			<CardContent>
				<Grid container direction={'column'} spacing={1}>
					<Grid item container justifyContent={'space-between'}>
						<Typography variant={'body1'}>
							<strong>Info</strong>
						</Typography>
						{onEdit && (
							<IconButton
								size={'small'}
								onClick={() => {
									onEdit(id);
								}}>
								<Edit />
							</IconButton>
						)}
					</Grid>
					<Grid item>
						<Typography variant={'subtitle2'} color={labelColor}>
							Name
						</Typography>
						<Typography variant={'body2'}>{name}</Typography>
					</Grid>
					<Grid item>
						<Typography variant={'subtitle2'} color={labelColor}>
							E-mail
						</Typography>
						<Typography variant={'body2'}>{email}</Typography>
					</Grid>
					<Grid item>
						<Typography variant={'subtitle2'} color={labelColor}>
							Phone
						</Typography>
						<Typography variant={'body2'}>{phone}</Typography>
					</Grid>
					<Grid item>
						<Typography variant={'subtitle2'} color={labelColor}>
							CPF
						</Typography>
						<Typography variant={'body2'}>{cpf}</Typography>
					</Grid>
					<Grid item>
						<Typography variant={'subtitle2'} color={labelColor}>
							Brith Date
						</Typography>
						<Typography variant={'body2'}>{formatDate(brithDate)}</Typography>
					</Grid>
					{mainAddress && (
						<Grid item>
							<Typography variant={'subtitle2'} color={labelColor}>
								Main Address
							</Typography>
							<Typography variant={'body2'}>{mainAddress}</Typography>
						</Grid>
					)}
				</Grid>
			</CardContent>
		</Card>
	);
};

export default CustomerInfo;
