import React, { FC } from 'react';
import {
	Card,
	CardContent,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	Radio,
	RadioGroup,
	Typography,
} from '@mui/material';

const orderByOption = [
	{ label: 'Price', value: 'price' },
	{ label: 'Name', value: 'name' },
];

const sortOrderOption = [
	{ label: 'Increasing', value: 'ASC' },
	{ label: 'Decreasing', value: 'DESC' },
];

interface FiltersStateProps {
	orderBy: string;
	sortOrder: string;
}
interface FiltersDispatchProps {
	onChange: (key: string, value: string) => void;
}

type FiltersProps = FiltersStateProps & FiltersDispatchProps;

const Filters: FC<FiltersProps> = ({ orderBy, sortOrder, onChange }) => {
	return (
		<Grid
			container
			direction={'column'}
			sx={{ mt: 1 }}
			item
			xs={4}
			md={3}
			lg={2}>
			<Card variant={'outlined'}>
				<CardContent>
					<Grid container direction={'column'} spacing={1} item xs>
						<Grid item xs>
							<Typography variant={'body1'}>
								<strong>Filter</strong>
							</Typography>
						</Grid>
						<Grid container direction={'column'} item xs>
							<FormControl>
								<FormLabel id="demo-controlled-radio-buttons-group">
									Sort Order
								</FormLabel>
								<RadioGroup
									aria-labelledby="demo-controlled-radio-buttons-group"
									name="controlled-radio-buttons-group"
									value={sortOrder}
									onChange={(e, value) => onChange('sortOrder', value)}>
									{sortOrderOption.map(({ label, value }) => (
										<FormControlLabel
											value={value}
											control={<Radio size={'small'} />}
											label={label}
										/>
									))}
								</RadioGroup>
							</FormControl>
						</Grid>
						<Grid container direction={'column'} item xs>
							<FormControl>
								<FormLabel id="orderby-radio">OrderBy</FormLabel>
								<RadioGroup
									aria-labelledby="orderby-radio"
									value={orderBy}
									onChange={(e, value) => onChange('orderBy', value)}>
									{orderByOption.map(({ label, value }) => (
										<FormControlLabel
											value={value}
											control={<Radio size={'small'} />}
											label={label}
										/>
									))}
								</RadioGroup>
							</FormControl>
						</Grid>
						<Grid container direction={'column'} item xs>
							<FormLabel id="demo-controlled-radio-buttons-group">
								Categories
							</FormLabel>
							{['Value1', 'Value2'].map(category => (
								<FormControlLabel
									key={category}
									control={<Checkbox size={'small'} defaultChecked />}
									label={category}
								/>
							))}
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Grid>
	);
};

export default Filters;
