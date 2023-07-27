import { Genre } from './Genre.model';

export default interface Anime {
	id: string;
	title: string;
	imagePath: string;
	description: string;
	studios: string[];
	producers: string[];
	genre: Genre[];
	seasons: number;
	episodes: number;
	featured: boolean;
}
