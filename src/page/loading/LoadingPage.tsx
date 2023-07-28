import { Container, Loader, Title, createStyles, rem } from '@mantine/core';

const useStyles = createStyles(theme => ({
	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		textAlign: 'center',
		fontWeight: 900,
		fontSize: rem(32),
		lineHeight: 1.2,
		marginBottom: rem(31.25),

		[theme.fn.largerThan('sm')]: {
			fontSize: rem(38),
		},
	},

	loader: {
		marginInline: 'auto',
		display: 'block',
	},
}));

export default function LoadingPage() {
	const { classes } = useStyles();

	return (
		<Container pt={rem(80)} pb={rem(120)}>
			<Title className={classes.title}>Loading...</Title>
			<Loader size='xl' className={classes.loader} />
		</Container>
	);
}
