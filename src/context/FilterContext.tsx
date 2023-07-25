import {
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useState,
} from 'react';
import { Genre } from '../components/model/Genre.model';

interface FilterContextType {
	currentGenre: Genre;
	changeCurrentGenre: Dispatch<SetStateAction<Genre>>;
}

const FilterContext = createContext<FilterContextType>({
	currentGenre: Genre.ALL,
	changeCurrentGenre: () => {},
});

export function FilterProvider({ children }: PropsWithChildren) {
	const [genre, setGenre] = useState<Genre>(Genre.ALL);

	const providerValue: FilterContextType = {
		currentGenre: genre,
		changeCurrentGenre: setGenre,
	};

	return (
		<FilterContext.Provider value={providerValue}>
			{children}
		</FilterContext.Provider>
	);
}

export default FilterContext;
