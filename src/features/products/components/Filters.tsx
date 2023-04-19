import React, { FC } from 'react';
import {
	Box,
	Card,
	CardContent,
	Checkbox,
	CircularProgress,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	Radio,
	RadioGroup,
	Typography,
} from '@mui/material';
import { useGetAllCategoriesQuery } from '@store/api/categoryApi';

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
	categories: Array<number>;
}
interface FiltersDispatchProps {
	onChange: (key: string, value: string) => void;
}

type FiltersProps = FiltersStateProps & FiltersDispatchProps;

const Filters: FC<FiltersProps> = ({
	orderBy,
	sortOrder,
	categories,
	onChange,
}) => {
	const { data: categoryOptions, isLoading } =
		useGetAllCategoriesQuery(undefined);

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
									{sortOrderOption.map(({ label, value }, index) => (
										<FormControlLabel
											key={`${label}-${index}`}
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
									{orderByOption.map(({ label, value }, index) => (
										<FormControlLabel
											key={`${label}-${index}`}
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
							{isLoading ? (
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										mt: 1,
									}}>
									<CircularProgress size={'2rem'} />
								</Box>
							) : Array.isArray(categoryOptions) &&
							  categoryOptions.length > 0 ? (
								categoryOptions.map(({ id, name, children }, index) => {
									const isContainedInFilter = categories.includes(id);
									return (
										<FormControlLabel
											key={`${name}-${index}`}
											control={
												<Checkbox
													size={'small'}
													value={id}
													onChange={e => {
														const isChecked = e.target.checked;
														if (isChecked && !isContainedInFilter) {
															onChange(
																'categories',
																[id, ...categories].join(',')
															);
														} else if (!isChecked && isContainedInFilter) {
															onChange(
																'categories',
																categories
																	.filter(category => category !== id)
																	.join(',')
															);
														}
													}}
													checked={isContainedInFilter}
												/>
											}
											label={name}
										/>
									);
								})
							) : null}
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Grid>
	);
};

export default Filters;
