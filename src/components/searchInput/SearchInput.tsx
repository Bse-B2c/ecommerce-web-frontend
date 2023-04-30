import React, { FC, useState } from 'react';
import { Search as SearchIcon } from '@mui/icons-material';
import {
	Autocomplete,
	CardMedia,
	CircularProgress,
	Grid,
	Typography,
	Link,
} from '@mui/material';
import {
	Search,
	SearchIconWrapper,
	StyledInputBase,
} from '@components/searchInput/style';
import { Product } from '@features/Product';
import { useLazySearchProductsQuery } from '@store/api/productApi';
import { minimizeTitle } from '@utils/utilsString';
import { Link as LinkRouter } from 'react-router-dom';

interface SearchInputStateProps {}
interface SearchInputDispatchProps {}

type SearchInputProps = SearchInputStateProps & SearchInputDispatchProps;

const SearchInput: FC<SearchInputProps> = () => {
	const [value, setValue] = React.useState('');
	const [suggestion, setSuggestion] = useState<Array<Product>>([]);
	const [timeoutFetchSuggestion, setTimeoutFetchSuggestion] =
		useState<NodeJS.Timeout | null>(null);
	const [onSearch, { isLoading, isFetching }] = useLazySearchProductsQuery();

	const onFecth = (value: string) => {
		if (timeoutFetchSuggestion) clearTimeout(timeoutFetchSuggestion);

		if (value !== '') {
			setTimeoutFetchSuggestion(
				setTimeout(async () => {
					try {
						const { data } = await onSearch(value);

						setSuggestion(data ? data : []);
					} catch (e) {
						setSuggestion([]);
					}
				}, 1000)
			);
		}
	};

	return (
		<Autocomplete
			options={suggestion || []}
			inputValue={value}
			getOptionLabel={option =>
				typeof option === 'string' ? option : option.name
			}
			filterOptions={options => options}
			freeSolo
			disableClearable
			loading={isLoading || isFetching}
			loadingText={<CircularProgress color="inherit" size={20} />}
			renderOption={(e, option) => {
				return (
					<li {...e}>
						<Link
							component={LinkRouter}
							to={`/product/${option.id}`}
							color="inherit"
							underline="none">
							<Grid container item xs>
								<Grid
									container
									item
									xs={4}
									alignItems="center"
									justifyContent="center">
									<CardMedia
										component="img"
										height={50}
										width={'100%'}
										sx={{ objectFit: 'contain' }}
										image={option.images[0] || ''}
									/>
								</Grid>
								<Grid item xs>
									<Typography variant="body2" fontWeight={800}>
										{option.name}
									</Typography>
									<Typography variant="body2">
										{minimizeTitle(option.description, 100)}
									</Typography>
								</Grid>
							</Grid>
						</Link>
					</li>
				);
			}}
			onInputChange={(event, value) => {
				onFecth(value);
				setValue(value);
			}}
			renderInput={({
				inputProps: { style, className, ...inputProps },
				size,
				...params
			}) => {
				return (
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							size="small"
							{...params}
							inputProps={{
								'aria-label': 'search',
								...inputProps,
							}}
						/>
					</Search>
				);
			}}
		/>
	);
};

export default SearchInput;
