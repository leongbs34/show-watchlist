import {
	createStyles,
	Autocomplete,
	Group,
	Burger,
	rem,
	Transition,
	Paper,
	useMantineTheme,
	Avatar,
	Text,
	SelectItemProps,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { SearchOutlined } from '@mui/icons-material';
import HeaderNav from './header-nav/HeaderNav';
import ThemeToggleBtn from '../theme-toggle-btn/ThemeToggleBtn';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { changeActiveNav } from '../../redux/slices/activeNavSlice';
import { animes } from '../../data/animeData';
import { forwardRef, useState } from 'react';
import useAppNavigate from '../../hooks/useAppNavigate';

const useStyles = createStyles(theme => ({
	'header': {
		paddingInline: theme.spacing.xs,
		backgroundColor:
			theme.colorScheme === 'dark' ? theme.colors.dark[7] : 'inherit',
		boxShadow: theme.colorScheme === 'dark' ? 'none' : theme.shadows.sm,
		position: 'relative',
		marginBottom: theme.spacing.lg,
	},

	'brand': {
		width: rem(39),
		flexShrink: 0,

		[theme.fn.largerThan('sm')]: {
			marginRight: 'auto',
		},

		[theme.fn.largerThan('md')]: {
			width: rem(48.83),
		},
	},

	'brand__img': {
		width: '100%',
		height: '100%',
		borderRadius: '50%',
	},

	'inner': {
		padding: theme.spacing.xs,
		justifyContent: 'space-between',
		display: 'flex',
		alignItems: 'center',
	},

	'searchbar': {
		width: '100%',
		paddingInline: theme.spacing.lg,
		marginInline: 'auto',

		[theme.fn.largerThan('md')]: {
			width: '50%',
		},
	},

	'searchbar-dropdown': {
		left: '0 !important',
		minWidth: '100%',

		[theme.fn.largerThan('md')]: {
			left: 'inherit !important',
			minWidth: 'inherit',
		},
	},

	'dropdown': {
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

	'burger': {
		[theme.fn.largerThan('sm')]: {
			display: 'none',
		},
	},

	'hiddenSm': {
		[theme.fn.smallerThan('sm')]: {
			display: 'none !important',
		},
	},

	'linkActive': {
		'&, &:hover': {
			backgroundColor: theme.fn.variant({
				variant: 'light',
				color: theme.primaryColor,
			}).background,
			color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
				.color,
		},
	},

	'headerBtn': {
		'display': 'flex',
		'& > :last-child': {
			marginLeft: rem(25),

			[theme.fn.largerThan('md')]: {
				marginLeft: rem(31),
			},
			[theme.fn.largerThan('lg')]: {
				marginLeft: rem(48.83),
			},
		},
	},
}));

interface ItemType {
	description: string;
	imagePath: string;
	value: string;
	id: string;
}

type ItemProps = ItemType & SelectItemProps;

const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
	({ description, value, imagePath, ...others }: ItemProps, ref) => {
		const theme = useMantineTheme();

		const largerThanSm = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);
		return (
			<div
				ref={ref}
				{...others}
				style={{ paddingBlock: rem(4), paddingInline: 0 }}
			>
				<Group noWrap>
					<Avatar src={imagePath} size={largerThanSm ? 'xl' : 'lg'} />

					<div>
						<Text lineClamp={2} size={largerThanSm ? 'xl' : 'md'}>
							{value}
						</Text>
						<Text
							size={largerThanSm ? 'lg' : 'sm'}
							color='dimmed'
							lineClamp={largerThanSm ? 3 : 1}
						>
							{description}
						</Text>
					</div>
				</Group>
			</div>
		);
	}
);

export default function Header() {
	const [opened, { toggle }] = useDisclosure(false);
	const dispatch = useAppDispatch();
	const handleAppNavigate = useAppNavigate();
	const theme = useMantineTheme();
	const largerThanSm = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);
	const { classes } = useStyles();
	const [searchInput, setSearchInput] = useState<string>('');

	return (
		<header className={classes.header}>
			<div className={classes.inner}>
				<Group className={classes.brand}>
					<Link
						to={'/'}
						onClick={() => {
							dispatch(changeActiveNav('/'));
						}}
					>
						<img
							src='/src/assets/brand-logo.jpg'
							alt='Brand Logo'
							className={classes['brand__img']}
						/>
					</Link>
				</Group>

				<Autocomplete
					placeholder='Search'
					size={largerThanSm ? 'md' : 'xs'}
					icon={<SearchOutlined />}
					classNames={{
						root: classes.searchbar,
						dropdown: classes['searchbar-dropdown'],
					}}
					data={animes.map(anime => ({
						id: anime.id,
						description: anime.description,
						imagePath: anime.imagePath,
						value: anime.title,
					}))}
					filter={(value, item) =>
						value.trim().length > 0
							? item.value.toLowerCase().includes(value.toLowerCase().trim())
							: false
					}
					transitionProps={{
						transition: 'pop-top-left',
						duration: 80,
						timingFunction: 'ease',
					}}
					itemComponent={AutoCompleteItem}
					value={searchInput}
					onChange={setSearchInput}
					onItemSubmit={(item: ItemType) => {
						setSearchInput('');
						handleAppNavigate('shows', item.id);
					}}
				/>
				<div className={`${classes.hiddenSm} ${classes.headerBtn}`}>
					<HeaderNav />
					<ThemeToggleBtn size='lg' />
				</div>

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
