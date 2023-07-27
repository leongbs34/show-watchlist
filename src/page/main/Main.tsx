import FeaturedItems from '../../components/featured-items/FeaturedItems';
import Filter from '../../components/filter/Filter';
import AnimeList from '../../components/anime-list/AnimeList';
import { FilterProvider } from '../../context/FilterContext';
import { Container, rem, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export default function Main() {
	const theme = useMantineTheme();
	const largerThanMd = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
	const largerThanLg = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`);

	return (
		<Container
			size={largerThanLg ? rem(1600) : largerThanMd ? rem(1140) : ''}
			fluid={!largerThanMd}
			p={!largerThanMd ? '0' : ''}
		>
			<FeaturedItems />
			<FilterProvider>
				<Filter />
				<AnimeList />
			</FilterProvider>
		</Container>
	);
}
