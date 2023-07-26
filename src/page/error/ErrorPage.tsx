import Header from '../../components/header/Header';
import { createStyles, rem } from '@mantine/core';
import Error from '../../components/error/Error';

const useStyles = createStyles(theme => ({
	label: {
		textAlign: 'center',
		fontWeight: 900,
		fontSize: rem(220),
		lineHeight: 1,
		marginBottom: `calc(${theme.spacing.xl} * 1.5)`,

		[theme.fn.smallerThan('sm')]: {
			fontSize: rem(120),
		},
	},
}));

export default function ErrorPage() {
	const { classes } = useStyles();

	return (
		<>
			<Header />
			<Error
				imagePath='/src/assets/saitama_ok.png'
				errorTitle='Page not found'
				errorText='The page you are looking for does not exist or another error
					occurred'
			>
				<div className={classes.label}>404</div>
			</Error>
		</>
	);
}
