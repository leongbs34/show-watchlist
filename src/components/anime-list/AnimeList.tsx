import {
	Card,
	Text,
	Container,
	TextProps,
	rem,
	createStyles,
	Grid,
} from '@mantine/core';
import { animes } from '../../data/animeData';
import styled from '@emotion/styled';
import Tags from '../tags/Tags';

import { useContext, useMemo } from 'react';
import FilterContext from '../../context/FilterContext';
import { Genre } from '../model/Genre.model';
import useAppNavigate from '../../hooks/useAppNavigate';

const Title = styled(Text)<TextProps>`
	line-height: 1.2;
`;

const useStyles = createStyles(theme => ({
	'card-section': {
		['&:hover']: {
			cursor: 'pointer',
		},

		[theme.fn.largerThan('sm')]: {
			height: rem(320),
		},

		[theme.fn.largerThan('lg')]: {
			height: rem(500),
		},
	},

	'image': {
		height: '100%',
		width: '100%',
		objectFit: 'cover',
	},
}));

export default function AnimeList() {
	const { currentGenre } = useContext(FilterContext);
	const handleAppNavigate = useAppNavigate();
	const { classes } = useStyles();

	const filteredAnimes = useMemo(
		() =>
			currentGenre === Genre.ALL
				? animes
				: animes.filter(anime => anime.genre.includes(currentGenre)),
		[currentGenre]
	);

	return (
		<Container mb={'lg'} fluid>
			<Grid>
				{filteredAnimes.map(anime => (
					<Grid.Col key={anime.id} mb={'md'} sm={6} md={4} lg={3}>
						<Card
							shadow='md'
							padding={'xs'}
							style={{ color: 'inherit', backgroundColor: 'inherit' }}
						>
							<Card.Section
								className={classes['card-section']}
								onClick={() => {
									handleAppNavigate('shows', anime.id);
								}}
							>
								<img
									src={anime.imagePath}
									alt={anime.title}
									className={classes.image}
								/>
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
						</Card>
					</Grid.Col>
				))}
			</Grid>
		</Container>
	);
}
