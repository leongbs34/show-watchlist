import {
	createStyles,
	Autocomplete,
	Group,
	Burger,
	rem,
	Transition,
	Paper,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { SearchOutlined } from '@mui/icons-material';
import HeaderNav from './header-nav/HeaderNav';
import ThemeToggleBtn from '../theme-toggle-btn/ThemeToggleBtn';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { changeActiveNav } from '../../redux/slices/activeNavSlice';

const useStyles = createStyles(theme => ({
	header: {
		paddingInline: theme.spacing.xs,
		backgroundColor:
			theme.colorScheme === 'dark' ? theme.colors.dark[7] : 'inherit',
		boxShadow: theme.colorScheme === 'dark' ? 'none' : theme.shadows.sm,
		position: 'relative',
		marginBottom: theme.spacing.lg,
	},

	brand: {
		width: rem(39),

		[theme.fn.largerThan('sm')]: {
			marginRight: 'auto',
		},
	},

	brand__img: {
		width: '100%',
		height: '100%',
		borderRadius: '50%',
	},

	inner: {
		padding: theme.spacing.xs,
		justifyContent: 'space-between',
		display: 'flex',
		alignItems: 'center',
	},

	dropdown: {
		position: 'absolute',
		translate: '0 100%',
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 1,
		borderTopRightRadius: 0,
		borderTopLeftRadius: 0,
		borderTopWidth: 0,
		overflow: 'hidden',

		[theme.fn.largerThan('sm')]: {
			display: 'none',
		},

		[`& > *`]: {
			'display': 'block',
			'lineHeight': 1,
			'padding': `${rem(8)} ${rem(12)}`,
			'borderRadius': theme.radius.sm,
			'textDecoration': 'none',
			'color':
				theme.colorScheme === 'dark'
					? theme.colors.dark[0]
					: theme.colors.gray[7],
			'fontSize': theme.fontSizes.sm,
			'fontWeight': 500,

			'&:hover': {
				backgroundColor:
					theme.colorScheme === 'dark'
						? theme.colors.dark[6]
						: theme.colors.gray[0],
			},

			[theme.fn.smallerThan('sm')]: {
				borderRadius: 0,
				padding: `${theme.spacing.xs} ${theme.spacing.md}`,
			},

			'&:not(:first-of-type)': {
				padding: 0,
			},
		},
	},

	burger: {
		[theme.fn.largerThan('sm')]: {
			display: 'none',
		},
	},

	hiddenSm: {
		[theme.fn.smallerThan('sm')]: {
			display: 'none',
		},
	},

	linkActive: {
		'&, &:hover': {
			backgroundColor: theme.fn.variant({
				variant: 'light',
				color: theme.primaryColor,
			}).background,
			color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
				.color,
		},
	},
}));

export default function Header() {
	const [opened, { toggle }] = useDisclosure(false);
	const dispatch = useAppDispatch();
	const { classes } = useStyles();

	return (
		<header className={classes.header}>
			<div className={classes.inner}>
				<Group className={classes.brand}>
					<Link
						to={'/'}
						onClick={() => {
							dispatch(changeActiveNav(''));
						}}
					>
						<img
							src='/src/assets/brand-logo.jpg'
							alt='Brand Logo'
							className={classes['brand__img']}
						/>
					</Link>
				</Group>

				<Group spacing={5}>
					<div className={classes.hiddenSm}>
						<HeaderNav />
					</div>
					{/* TODO: Search autocomplete and search result to include image and link to show */}
					<Autocomplete
						placeholder='Search'
						size='xs'
						icon={<SearchOutlined />}
						data={[
							'React',
							'Angular',
							'Vue',
							'Next.js',
							'Riot.js',
							'Svelte',
							'Blitz.js',
						]}
					/>
					<div className={classes.hiddenSm}>
						<ThemeToggleBtn size='lg' />
					</div>
				</Group>

				<Burger
					opened={opened}
					onClick={toggle}
					className={classes.burger}
					size='sm'
				/>

				<Transition transition='pop-top-right' duration={100} mounted={opened}>
					{styles => (
						<Paper className={classes.dropdown} withBorder style={styles}>
							<ThemeToggleBtn size='lg' />
							<HeaderNav toggleMenu={toggle} />
						</Paper>
					)}
				</Transition>
			</div>
		</header>
	);
}
