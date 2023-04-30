import React, { FC } from 'react';
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Container,
	Divider,
	FormControl,
	Grid,
	Icon,
	TextField,
	Typography,
} from '@mui/material';
import { Facebook, Instagram, Twitter, YouTube } from '@mui/icons-material';

interface AppFooterStateProps {}
interface AppFooterDispatchProps {}

type AppFooterProps = AppFooterStateProps & AppFooterDispatchProps;

const AppFooter: FC<AppFooterProps> = () => {
	return (
		<Box
			sx={{
				width: '100%',
				height: 'auto',
				backgroundColor: 'inherit.main',
				paddingTop: '1rem',
				mt: 2,
				paddingBottom: '1rem',
			}}>
			<Container maxWidth="lg">
				<Grid container direction="column" alignItems="center" spacing={2} item>
					<Grid
						container
						justifyContent="center"
						alignItems="center"
						item
						xs={12}>
						<Typography variant="body1">Sign up for our newsletter</Typography>
						<FormControl sx={{ display: 'flex', flexDirection: 'row', ml: 2 }}>
							<TextField
								size="small"
								type="email"
								placeholder="rodrigo@example.com"
							/>
							<Button variant="outlined" sx={{ ml: 1 }}>
								Send
							</Button>
						</FormControl>
					</Grid>
					<Divider variant="fullWidth" flexItem sx={{ mt: 2, mb: 1 }} />
					<Grid
						container
						item
						xs={12}
						justifyContent="space-around"
						alignItems="center">
						<Card
							variant="outlined"
							sx={{
								textAlign: 'center',
								width: 300,
								height: 150,
							}}>
							<CardHeader title={'Ecommerce'} subheader={'know us'} />
							<CardContent
								sx={{
									textAlign: 'center',
									display: 'flex',
									justifyContent: 'space-around',
								}}>
								<Button variant="contained" fullWidth>
									About US
								</Button>
							</CardContent>
						</Card>
						<Card
							variant="outlined"
							sx={{
								textAlign: 'center',
								width: 300,
								height: 150,
							}}>
							<CardHeader
								title={'Stay Connected'}
								subheader={'All Social Media'}
							/>
							<CardContent
								sx={{
									textAlign: 'center',
									display: 'flex',
									justifyContent: 'space-around',
								}}>
								<Icon>
									<Facebook />
								</Icon>
								<Icon>
									<Instagram />
								</Icon>
								<Icon>
									<Twitter />
								</Icon>
								<Icon>
									<YouTube />
								</Icon>
							</CardContent>
						</Card>
						<Card
							variant="outlined"
							sx={{
								textAlign: 'center',
								width: 300,
								height: 150,
							}}>
							<CardHeader
								title={'Customer Service'}
								subheader={'Ecommerce Service'}
							/>
							<CardContent
								sx={{
									textAlign: 'center',
									display: 'flex',
									justifyContent: 'space-around',
								}}>
								<Button variant="contained" fullWidth>
									Contact US
								</Button>
							</CardContent>
						</Card>
					</Grid>
					<Divider variant="fullWidth" flexItem sx={{ mt: 2, mb: 1 }} />
					<Grid item xs={12}>
						<Typography color="textSecondary" variant="subtitle1">
							© 2020 Copyright:
						</Typography>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default AppFooter;
