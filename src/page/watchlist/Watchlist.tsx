import {
	Button,
	Card,
	Container,
	Flex,
	Grid,
	Image,
	NumberInput,
	Rating,
	Text,
	Title,
	createStyles,
	rem,
	useMantineTheme,
} from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { animes } from '../../data/animeData';
import { useEffect, useMemo } from 'react';
import {
	changeEpisodes,
	changeRatings,
	removeFromWatchlist,
	setWatchlist,
	showsType,
} from '../../redux/slices/watchlistSlice';
import Tags from '../../components/tags/Tags';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import Error from '../../components/error/Error';
import useAppNavigate from '../../hooks/useAppNavigate';
import { useMediaQuery } from '@mantine/hooks';
import localforage from 'localforage';

const useStyles = createStyles(theme => ({
	'watchlist-header': {
		[theme.fn.largerThan('md')]: {
			fontSize: rem(40),
			marginBottom: theme.spacing.xl,
		},
	},

	'watchlist-item': {
		color: 'inherit',
		backgroundColor: 'inherit',
		marginBottom: rem(20),

		[theme.fn.largerThan('sm')]: {
			marginBottom: rem(25),
		},

		[theme.fn.largerThan('lg')]: {
			marginBottom: rem(31.25),
		},
	},

	'show-title': {
		lineHeight: 1.2,

		[theme.fn.largerThan('md')]: {
			fontSize: rem(25),
		},

		[theme.fn.largerThan('lg')]: {
			fontSize: rem(31.25),
		},
	},

	'subheadings': {
		letterSpacing: '0.75px',
		textTransform: 'uppercase',
		fontWeight: 700,
		fontSize: theme.fontSizes.xs,

		[theme.fn.largerThan('sm')]: {
			fontSize: theme.fontSizes.sm,
		},
		[theme.fn.largerThan('md')]: {
			fontSize: rem(14),
		},
		[theme.fn.largerThan('lg')]: {
			fontSize: theme.fontSizes.lg,
		},
	},

	'ratings': {
		'& > svg': {
			[theme.fn.largerThan('md')]: {
				width: '1.75rem',
				height: '1.75rem',
			},
		},
	},

	'image': {
		'&:hover': {
			cursor: 'pointer',
		},
	},
}));

function Ratings({
	ratingsValue,
	showId,
}: {
	ratingsValue: number;
	showId: string;
}) {
	const dispatch = useAppDispatch();
	const { classes } = useStyles();

	const setRatings = (ratings: number, showId: string) => {
		dispatch(changeRatings({ ratings, id: showId }));
	};

	return (
		<div>
			<Text className={classes.subheadings}>Ratings</Text>
			<Rating
				defaultValue={0}
				value={ratingsValue}
				fractions={2}
				onChange={ratings => {
					setRatings(ratings, showId);
				}}
				classNames={{ symbolBody: classes.ratings }}
			/>
		</div>
	);
}

export default function Watchlist() {
	const watchlistShows = useAppSelector(state => state.watchlist.shows);
	const dispatch = useAppDispatch();
	const handleAppNavigate = useAppNavigate();
	const { classes } = useStyles();
	const theme = useMantineTheme();
	const largerThanSm = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);
	const largerThanMd = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
	const largerThanLg = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`);

	useEffect(() => {
		localforage
			.getItem('watchlist')
			.then(value => {
				// This code runs once the value has been loaded
				// from the offline store.
				dispatch(setWatchlist(value as showsType));
			})
			.catch(err => {
				// This code runs if there were any errors
				console.log(err);
			});
	}, []);

	const shows = useMemo(
		() => animes.filter(anime => anime.id in watchlistShows),
		[watchlistShows]
	);

	const onRemove = (showId: string) => {
		dispatch(removeFromWatchlist(showId));
	};

	const onChangeEpisodesWatched = (showId: string, episodes: number) => {
		dispatch(changeEpisodes({ id: showId, episodes }));
	};

	return (
		<Container size={largerThanLg ? rem(1600) : largerThanMd ? rem(1140) : ''}>
			<Title order={2} mb={'md'} className={classes['watchlist-header']}>
				<Flex align={'center'} gap={rem(8)}>
					<BookmarksOutlinedIcon fontSize='inherit' />
					Watchlist ({shows.length})
				</Flex>
			</Title>
			{shows.length === 0 && (
				<Error
					imageName='totoro_sleeping'
					errorTitle='Your watchlist is empty'
					errorText="Looks like you haven't made your choice yet..."
				/>
			)}
			{shows.map(show => (
				<Card
					key={show.id}
					shadow='md'
					padding={0}
					className={classes['watchlist-item']}
				>
					<Grid m={0}>
						<Grid.Col
							span={12}
							sm={6}
							p={0}
							onClick={() => {
								handleAppNavigate('/shows', show.id);
							}}
						>
							<Card.Section className={classes.image}>
								<Image src={show.imagePath} height={largerThanMd ? 300 : 240} />
							</Card.Section>
						</Grid.Col>
						<Grid.Col
							span={12}
							px={largerThanLg ? 'lg' : largerThanMd ? 'md' : 'xs'}
							pb={'md'}
							sm={6}
						>
							<Title size={'h3'} mb={rem(4)} className={classes['show-title']}>
								{show.title}
							</Title>
							<Tags genres={show.genre} mb={rem(16)} />
							<Grid align='end' justify='flex-end'>
								<Grid.Col span={12}>
									<Ratings
										ratingsValue={watchlistShows[show.id].ratings}
										showId={show.id}
									/>
								</Grid.Col>
								<Grid.Col span={6}>
									<Text className={classes.subheadings}>Episodes</Text>
									<NumberInput
										placeholder='Episodes watched'
										value={watchlistShows[show.id].episodeWatched}
										onChange={(episode: number) => {
											onChangeEpisodesWatched(show.id, episode);
										}}
										defaultValue={0}
										stepHoldDelay={500}
										stepHoldInterval={100}
										parser={value => value.replace(/$\s?|(,*)/g, '')}
										formatter={value =>
											!Number.isNaN(parseFloat(value))
												? `${value} / ${show.episodes}`
												: `0 / ${show.episodes}`
										}
										max={show.episodes}
										min={0}
										size={largerThanLg ? 'lg' : largerThanSm ? 'md' : 'sm'}
									/>
								</Grid.Col>
								<Grid.Col
									span={6}
									style={{ display: 'flex', justifyContent: 'flex-end' }}
								>
									<Button
										variant='outline'
										color='red'
										onClick={() => onRemove(show.id)}
										size={largerThanLg ? 'lg' : largerThanSm ? 'md' : 'sm'}
									>
										Remove
									</Button>
								</Grid.Col>
							</Grid>
						</Grid.Col>
					</Grid>
				</Card>
			))}
		</Container>
	);
}
