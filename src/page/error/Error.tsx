import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import {
	createStyles,
	Title,
	Text,
	Button,
	Container,
	Group,
	rem,
	Image,
} from '@mantine/core';

const useStyles = createStyles(theme => ({
	root: {
		paddingTop: rem(80),
		paddingBottom: rem(120),
	},

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

	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		textAlign: 'center',
		fontWeight: 900,
		fontSize: rem(38),

		[theme.fn.smallerThan('sm')]: {
			fontSize: rem(32),
		},
	},

	description: {
		maxWidth: rem(540),
		margin: 'auto',
		marginTop: theme.spacing.xl,
		marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
		color: theme.colors.gray[6],
	},
}));

export default function Error() {
	const { classes } = useStyles();

	return (
		<>
			<Header />
			<div className={classes.root}>
				<Container>
					<Image
						src='/src/assets/saitama_ok.png'
						width={rem(240)}
						mx={'auto'}
						mb={rem(25)}
					/>
					<div className={classes.label}>404</div>
					<Title className={classes.title}>Page not found</Title>
					<Text size='lg' align='center' className={classes.description}>
						The page you are looking for does not exist or another error
						occurred
					</Text>
					<Group position='center'>
						<Button variant='outline' size='md'>
							<Link to={'/'} style={{ all: 'unset' }}>
								Go Home
							</Link>
						</Button>
					</Group>
				</Container>
			</div>
		</>
	);
}
