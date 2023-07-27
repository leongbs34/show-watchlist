import { Link } from 'react-router-dom';
import {
	createStyles,
	Title,
	Text,
	Button,
	Container,
	Group,
	rem,
} from '@mantine/core';
import { PropsWithChildren } from 'react';
import { changeActiveNav } from '../../redux/slices/activeNavSlice';
import { useAppDispatch } from '../../redux/hooks';

const useStyles = createStyles(theme => ({
	'root': {
		paddingTop: rem(80),
		paddingBottom: rem(120),
	},

	'title': {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		textAlign: 'center',
		fontWeight: 900,
		fontSize: rem(38),
		lineHeight: 1.2,

		[theme.fn.smallerThan('sm')]: {
			fontSize: rem(32),
		},
	},

	'description': {
		maxWidth: rem(540),
		margin: 'auto',
		marginTop: theme.spacing.xl,
		marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
		color: theme.colors.gray[6],
	},

	'image-container': {
		width: rem(240),
		marginInline: 'auto',
		marginBottom: rem(25),
	},
	'image': {
		width: '100%',
		height: '100%',
	},
}));

interface ErrorProps extends PropsWithChildren {
	imageName: string;
	errorTitle: string;
	errorText: string;
}

function getImageUrl(name: string) {
	return new URL(`../../assets/${name}.png`, import.meta.url).href;
}

function getImageUrlWebp(name: string) {
	return new URL(`../../assets/${name}.webp`, import.meta.url).href;
}

export default function Error({
	imageName,
	errorTitle,
	errorText,
	children,
}: ErrorProps) {
	const { classes } = useStyles();
	const dispatch = useAppDispatch();

	return (
		<div className={classes.root}>
			<Container>
				<div className={classes['image-container']}>
					<picture>
						<source srcSet={getImageUrlWebp(imageName)} type='image/webp' />
						<source srcSet={getImageUrl(imageName)} type='image/png' />
						<img
							src={getImageUrl(imageName)}
							alt='Error image'
							className={classes.image}
						/>
					</picture>
				</div>
				{children}
				<Title className={classes.title}>{errorTitle}</Title>
				<Text size='lg' align='center' className={classes.description}>
					{errorText}
				</Text>
				<Group position='center'>
					<Button variant='outline' size='md'>
						<Link
							to={'/'}
							style={{ all: 'unset' }}
							onClick={() => {
								dispatch(changeActiveNav('/'));
							}}
						>
							Go Home
						</Link>
					</Button>
				</Group>
			</Container>
		</div>
	);
}
