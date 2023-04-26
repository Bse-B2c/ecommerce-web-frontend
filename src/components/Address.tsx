import React, { FC } from 'react';
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Icon,
	Typography,
} from '@mui/material';
import { Delete, Edit, PushPin } from '@mui/icons-material';

interface AddressStateProps {
	isViewMode?: boolean;
	isPinned?: boolean;
	id: number;
	streetName: string;
	city: string;
	country: string;
	apartment: string;
	houseNumber: number;
	zipCode: string;
}
interface AddressDispatchProps {
	onDelete?: (id: number) => void;
	onEdit?: (id: number) => void;
	onPinned?: (id: number) => void;
}

type AddressProps = AddressStateProps & AddressDispatchProps;

const Address: FC<AddressProps> = ({
	isViewMode,
	isPinned,
	id,
	streetName,
	houseNumber,
	apartment,
	zipCode,
	city,
	country,
	onDelete,
	onEdit,
	onPinned,
}) => {
	return (
		<Card variant="outlined">
			<CardContent>
				<Box
					marginBottom={1}
					sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Typography variant="body1" sx={{ marginRight: 4 }}>
						<strong>{streetName}</strong>
					</Typography>
					{isPinned && (
						<Icon fontSize={'small'} color="info">
							<PushPin />
						</Icon>
					)}
				</Box>
				<Typography variant="body2">
					House Number: {houseNumber}, {apartment}
				</Typography>
				<Typography variant="body2">
					Cep {zipCode} - {city} - {country}
				</Typography>
			</CardContent>
			{!isViewMode && (
				<CardActions
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						paddingRight: 2,
					}}>
					{!isPinned && onPinned && (
						<Button
							size="small"
							color="secondary"
							variant="outlined"
							startIcon={<PushPin />}
							onClick={() => onPinned(id)}>
							Pin
						</Button>
					)}
					{onEdit && (
						<Button
							size="small"
							variant="outlined"
							startIcon={<Edit />}
							onClick={() => onEdit(id)}>
							Edit
						</Button>
					)}
					{onDelete && (
						<Button
							size="small"
							color="error"
							variant="outlined"
							startIcon={<Delete />}
							onClick={() => onDelete(id)}>
							Delete
						</Button>
					)}
				</CardActions>
			)}
		</Card>
	);
};

export default Address;
