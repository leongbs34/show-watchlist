import { PropsWithChildren, createContext, useState } from 'react';
import { Genre } from '../components/model/Genre.model';

interface FilterContextType {
	currentGenre: Genre;
	changeCurrentGenre: (genre: Genre) => void;
}

const FilterContext = createContext<FilterContextType>({
	currentGenre: Genre.ALL,
	changeCurrentGenre: () => {},
});

export function FilterProvider({ children }: PropsWithChildren) {
	const [genre, setGenre] = useState<Genre>(Genre.ALL);

	const changeCurrentGenre = (newGenre: Genre) => {
		setGenre(prevGenre => {
			if (prevGenre === newGenre) {
				return Genre.ALL;
			}
			return newGenre;
		});
	};

	const providerValue: FilterContextType = {
		currentGenre: genre,
		changeCurrentGenre,
	};

	return (
		<FilterContext.Provider value={providerValue}>
			{children}
		</FilterContext.Provider>
	);
}

export default FilterContext;
