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
	TextProps,
	Title,
	rem,
} from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { animes } from '../../data/animeData';
import { useMemo } from 'react';
import {
	changeEpisodes,
	changeRatings,
	removeFromWatchlist,
} from '../../redux/slices/watchlistSlice';
import Tags from '../../components/tags/Tags';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import styled from '@emotion/styled';
import Error from '../../components/error/Error';

const Subheadings = styled(Text)<TextProps>`
	letter-spacing: 0.75px;
	text-transform: uppercase;
	font-weight: 700;
	font-size: ${({ theme }) => theme.fontSizes.xs};
`;

function Ratings({
	ratingsValue,
	showId,
}: {
	ratingsValue: number;
	showId: string;
}) {
	const dispatch = useAppDispatch();

	const setRatings = (ratings: number, showId: string) => {
		dispatch(changeRatings({ ratings, id: showId }));
	};

	return (
		<div>
			<Subheadings>Ratings</Subheadings>
			<Rating
				defaultValue={0}
				value={ratingsValue}
				fractions={2}
				onChange={ratings => {
					setRatings(ratings, showId);
				}}
			/>
		</div>
	);
}

export default function Watchlist() {
	const watchlistShows = useAppSelector(state => state.watchlist.shows);
	const dispatch = useAppDispatch();

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
		<Container>
			<Title order={2} mb={'md'}>
				<Flex align={'center'} gap={rem(8)}>
					<BookmarksIcon />
					Watchlist ({shows.length})
				</Flex>
			</Title>
			{shows.length === 0 && (
				<Error
					imagePath='/src/assets/totoro_sleeping.png'
					errorTitle='Your watchlist is empty'
					errorText="Looks like you haven't made your choice yet..."
				/>
			)}
			{shows.map(show => (
				<Card
					key={show.id}
					shadow='md'
					padding={0}
					style={{ color: 'inherit', backgroundColor: 'inherit' }}
					mb={'sm'}
				>
					<Grid m={0}>
						<Grid.Col span={12} p={0}>
							<Card.Section>
								<Image src={show.imagePath} />
							</Card.Section>
						</Grid.Col>
						<Grid.Col span={12} px={'xs'} pb={'md'}>
							<Title size={'h3'} style={{ lineHeight: 1.2 }} mb={rem(4)}>
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
									<Subheadings>Episodes</Subheadings>
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
