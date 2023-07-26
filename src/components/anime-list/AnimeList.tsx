import {
	Card,
	Image,
	Text,
	Container,
	TextProps,
	Button,
	Flex,
	rem,
	createStyles,
} from '@mantine/core';
import { animes } from '../../data/animeData';
import styled from '@emotion/styled';
import Tags from '../tags/Tags';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { useContext, useMemo } from 'react';
import FilterContext from '../../context/FilterContext';
import { Genre } from '../model/Genre.model';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
	addToWatchlist,
	removeFromWatchlist,
} from '../../redux/slices/watchlistSlice';
import { useNavigate } from 'react-router-dom';

const Grid = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	row-gap: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled(Text)<TextProps>`
	line-height: 1.2;
`;

const useStyles = createStyles(() => ({
	'card-section': {
		['&:hover']: {
			cursor: 'pointer',
		},
	},
}));

const GridCol = styled.div``;

export default function AnimeList() {
	const { currentGenre } = useContext(FilterContext);
	const watchlistShows = useAppSelector(state => state.watchlist.shows);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { classes } = useStyles();

	const filteredAnimes = useMemo(
		() =>
			currentGenre === Genre.ALL
				? animes
				: animes.filter(anime => anime.genre.includes(currentGenre)),
		[currentGenre]
	);

	const isWatchlisted = (id: string) => id in watchlistShows;

	const handleAddToWatchlist = (id: string) => {
		dispatch(addToWatchlist(id));
	};
	const handleRemoveFromWatchlist = (id: string) => {
		dispatch(removeFromWatchlist(id));
	};

	return (
		<Container mb={'lg'}>
			<Grid>
				{filteredAnimes.map(anime => (
					<GridCol key={anime.id}>
						<Card
							shadow='md'
							padding={'xs'}
							style={{ color: 'inherit', backgroundColor: 'inherit' }}
						>
							<Card.Section
								className={classes['card-section']}
								onClick={() => {
									navigate(`shows/${anime.id}`);
								}}
							>
								<Image src={anime.imagePath} alt={anime.title} height={160} />
							</Card.Section>
							<Title
								weight={700}
								transform='capitalize'
								lineClamp={2}
								mt={'xs'}
								mb={'xs'}
							>
								{anime.title}
							</Title>
							<Tags genres={anime.genre} />
							<Button
								variant='light'
								color={isWatchlisted(anime.id) ? 'red' : 'blue'}
								fullWidth
								radius='md'
								mt={'md'}
								onClick={() => {
									if (isWatchlisted(anime.id))
										handleRemoveFromWatchlist(anime.id);
									else handleAddToWatchlist(anime.id);
								}}
							>
								<Flex gap={rem(8)} align='center'>
									{isWatchlisted(anime.id) ? (
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
						</Card>
					</GridCol>
				))}
			</Grid>
		</Container>
	);
}
