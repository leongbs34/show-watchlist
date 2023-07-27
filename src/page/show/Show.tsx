import { useParams } from 'react-router-dom';
import { animes } from '../../data/animeData';
import {
	Button,
	Card,
	Container,
	Flex,
	Image,
	Spoiler,
	createStyles,
	rem,
	useMantineTheme,
} from '@mantine/core';
import styled from '@emotion/styled';
import useAppNavigate from '../../hooks/useAppNavigate';
import { useEffect, useMemo } from 'react';
import {
	addToWatchlist,
	removeFromWatchlist,
} from '../../redux/slices/watchlistSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { useMediaQuery } from '@mantine/hooks';

const useStyles = createStyles(theme => ({
	'root': {
		display: 'grid',
		gridTemplateColumns: '1fr',

		[theme.fn.largerThan('sm')]: {
			gridTemplateColumns: '1fr 1fr',
		},
	},

	'details': {
		paddingInline: theme.spacing.md,
	},

	'image': {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
	},

	'details-title': {
		lineHeight: 1.1,
		textWrap: 'balance',
		marginBottom: theme.spacing.xs,
		marginTop: theme.spacing.md,
		fontSize: rem(40),
	},

	'details-duration': {
		display: 'flex',
		gap: theme.spacing.sm,
		fontSize: theme.fontSizes.sm,
		color:
			theme.colorScheme === 'dark'
				? theme.colors.gray[4]
				: theme.fn.darken(theme.colors.gray[6], 0.2),
		fontWeight: 500,
		marginBottom: theme.spacing.lg,
	},

	'details-info': {
		display: 'grid',
		gridTemplateColumns: 'auto 1fr',
		columnGap: theme.spacing.xl,
		rowGap: theme.spacing.sm,
		marginBottom: rem(31.25),
	},

	'details-info-label': {
		color:
			theme.colorScheme === 'dark'
				? theme.colors.gray[6]
				: theme.fn.darken(theme.colors.gray[6], 0.2),
	},
}));

const Separator = styled.span`
	background: ${({ theme }) =>
		theme.colorScheme === 'dark' ? theme.colors.gray[4] : theme.colors.gray[6]};
	width: 1px;
`;

export default function Show() {
	const params = useParams<{ showId: string }>();
	const dispatch = useAppDispatch();
	const watchlistShows = useAppSelector(state => state.watchlist.shows);
	const theme = useMantineTheme();
	const largerThanSm = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);
	const largerThanMd = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
	const largerThanLg = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`);

	const show = useMemo(
		() => animes.find(anime => anime.id === params.showId),
		[params.showId]
	);
	const appNavigate = useAppNavigate();
	const { classes } = useStyles();

	const isWatchlisted = (id: string) => id in watchlistShows;

	const handleAddToWatchlist = (id: string) => {
		dispatch(addToWatchlist(id));
	};

	const handleRemoveFromWatchlist = (id: string) => {
		dispatch(removeFromWatchlist(id));
	};

	useEffect(() => {
		if (!show) {
			appNavigate('/404', '');
		}
	}, [show]);

	if (!show) {
		return null;
	}
	return (
		<Container
			size={largerThanLg ? rem(1600) : largerThanMd ? rem(1140) : ''}
			fluid={!largerThanMd}
			p={!largerThanMd ? '0' : ''}
			mb={'lg'}
		>
			<Card p={0}>
				<div className={classes.root}>
					<img
						src={show!.imagePath}
						alt={show!.title}
						className={classes.image}
					/>
					<div className={classes.details}>
						<h2 className={classes['details-title']}>{show!.title}</h2>
						<div className={classes['details-duration']}>
							<span>{show!.seasons} Seasons</span>
							<Separator aria-hidden='true' role='presentation' />
							<span>{show!.episodes} Episodes</span>
						</div>
						<Spoiler
							maxHeight={120}
							showLabel='Show more'
							hideLabel='Hide'
							mb={'md'}
						>
							{show!.description}
						</Spoiler>
						<div className={classes['details-info']}>
							<span className={classes['details-info-label']}>Genre</span>
							<span style={{ textTransform: 'capitalize' }}>
								{show!.genre.length !== 0 ? show!.genre.join(', ') : '-'}
							</span>
							<span className={classes['details-info-label']}>Studios</span>
							<span>
								{show!.studios.length !== 0 ? show!.studios.join(', ') : '-'}
							</span>
							<span className={classes['details-info-label']}>Producers</span>
							<span>
								{show!.producers.length !== 0
									? show!.producers.join(', ')
									: '-'}
							</span>
						</div>
						<Button
							variant='filled'
							color={isWatchlisted(show!.id) ? 'red' : 'blue'}
							display={'block'}
							mx={'auto'}
							mb={'md'}
							radius='md'
							onClick={() => {
								if (isWatchlisted(show!.id))
									handleRemoveFromWatchlist(show!.id);
								else handleAddToWatchlist(show!.id);
							}}
						>
							<Flex gap={rem(8)} align='center'>
								{isWatchlisted(show!.id) ? (
									<>
										<HeartBrokenIcon />
										<span>Remove from watchlist</span>
									</>
								) : (
									<>
										<FavoriteIcon />
										<span>Add to watchlist</span>
									</>
								)}
							</Flex>
						</Button>
					</div>
				</div>
			</Card>
		</Container>
	);
}
