import React, { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { Specification } from '@features/Product/model/Specification';

interface ProductSpecificationStateProps {
	specifications?: Array<Specification>;
}
interface ProductSpecificationDispatchProps {}

type ProductSpecificationProps = ProductSpecificationStateProps &
	ProductSpecificationDispatchProps;

const ProductSpecification: FC<ProductSpecificationProps> = ({
	specifications,
}) => {
	const content =
		Array.isArray(specifications) && specifications.length > 0
			? specifications.map(({ label, value }, index) => (
					<Grid container item xs key={`${label}-${index}`}>
						<Grid item xs={2}>
							<Typography variant={'body1'} color={'text.secondary'}>
								<strong>{label}</strong>
							</Typography>
						</Grid>
						<Grid item>
							<Typography variant={'body1'} color={'text.secondary'}>
								{value}
							</Typography>
						</Grid>
					</Grid>
			  ))
			: null;

	return content ? (
		<Grid container direction={'column'} spacing={1} sx={{ mt: 2 }}>
			<Grid item xs>
				<Typography variant={'h6'}>Specification</Typography>
			</Grid>
			{content}
		</Grid>
	) : null;
};

export default ProductSpecification;
