import FeaturedItems from '../../components/featured-items/FeaturedItems';
import Filter from '../../components/filter/Filter';
import AnimeList from '../../components/anime-list/AnimeList';
import { FilterProvider } from '../../context/FilterContext';

export default function Main() {
	return (
		<>
			<FeaturedItems />
			<FilterProvider>
				<Filter />
				<AnimeList />
			</FilterProvider>
		</>
	);
}
