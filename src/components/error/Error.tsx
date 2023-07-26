import { Link } from 'react-router-dom';
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
import { PropsWithChildren } from 'react';

const useStyles = createStyles(theme => ({
	root: {
		paddingTop: rem(80),
		paddingBottom: rem(120),
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

interface ErrorProps extends PropsWithChildren {
	imagePath: string;
	errorTitle: string;
	errorText: string;
}

export default function Error({
	imagePath,
	errorTitle,
	errorText,
	children,
}: ErrorProps) {
	const { classes } = useStyles();

	return (
		<div className={classes.root}>
			<Container>
				<Image src={imagePath} width={rem(240)} mx={'auto'} mb={rem(25)} />
				{children}
				<Title className={classes.title}>{errorTitle}</Title>
				<Text size='lg' align='center' className={classes.description}>
					{errorText}
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
	);
}
