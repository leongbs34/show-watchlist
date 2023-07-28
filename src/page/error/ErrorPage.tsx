import Header from '../../components/header/Header';
import { createStyles, rem } from '@mantine/core';
import { Suspense, lazy } from 'react';
import LoadingPage from '../loading/LoadingPage';

const Error = lazy(() => import('../../components/error/Error'));

const useStyles = createStyles(theme => ({
	label: {
		textAlign: 'center',
		fontWeight: 900,
		fontSize: rem(120),
		lineHeight: 1,
		marginBottom: `calc(${theme.spacing.xl} * 1.5)`,

		[theme.fn.largerThan('sm')]: {
			fontSize: rem(220),
		},
	},
}));

export default function ErrorPage() {
	const { classes } = useStyles();

	return (
		<>
			<Header />
			<Suspense fallback={<LoadingPage />}>
				<Error
					imageName='saitama_ok'
					errorTitle='Page not found'
					errorText='The page you are looking for does not exist or another error
					occurred'
				>
					<div className={classes.label}>404</div>
				</Error>
			</Suspense>
		</>
	);
}
