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
import { Delete, Edit, PushPin, Check } from '@mui/icons-material';
import { Addresses } from '@features/authentication';

interface AddressStateProps {
	isViewMode?: boolean;
	isPinned?: boolean;
	isSelected?: boolean;
	id: number;
	streetName: string;
	city: string;
	country: string;
	apartment: string;
	houseNumber: number;
	zipCode: string;
	region: string;
}
interface AddressDispatchProps {
	onDelete?: (id: number) => void;
	onEdit?: (id: number) => void;
	onPinned?: (id: number) => void;
	onSelect?: (item: Addresses) => void;
}

type AddressProps = AddressStateProps & AddressDispatchProps;

const Address: FC<AddressProps> = ({
	isViewMode,
	isPinned,
	isSelected,
	id,
	streetName,
	houseNumber,
	apartment,
	zipCode,
	city,
	country,
	region,
	onDelete,
	onEdit,
	onPinned,
	onSelect,
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
					Cep {zipCode} - {region}, {city} - {country}
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
					{onSelect && (
						<Button
							size="small"
							variant={isSelected ? 'contained' : 'outlined'}
							disabled={isSelected}
							disableElevation
							color="success"
							startIcon={<Check />}
							onClick={() =>
								onSelect({
									id,
									active: !!isPinned,
									streetName,
									houseNumber,
									apartment,
									zipCode,
									city,
									country,
									region,
								})
							}>
							Select
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
