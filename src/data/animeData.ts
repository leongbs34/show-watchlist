import Anime from '../components/model/Anime.model';
import { Genre } from '../components/model/Genre.model';

export const animes: Anime[] = [
	{
		id: '1',
		title: 'I got a cheat skill in another world',
		imagePath:
			'https://static.bunnycdn.ru/i/cache/images/5/5e/5e85ca932f49b19e457d2b198124530c.jpg',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo nobis facere harum? Iste inventore officia temporibus recusandae minus aut unde labore blanditiis, vel consequatur rem voluptatum, ad minima aperiam omnis.',
		genre: [Genre.ACTION, Genre.SHOUNEN],
		seasons: 1,
		episodes: 13,
		featured: true,
	},
	{
		id: '2',
		title:
			'Higeki no Genkyou to Naru Saikyou Gedou Last Boss Joou wa Tami no Tame ni Tsukushimasu.',
		imagePath:
			'https://static.bunnycdn.ru/i/cache/images/e/e4/e48e309b616c79281aceef18ec75e2c2.jpg',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo nobis facere harum? Iste inventore officia temporibus recusandae minus aut unde labore blanditiis, vel consequatur rem voluptatum, ad minima aperiam omnis.',
		genre: [Genre.ACTION, Genre.SHOUNEN, Genre.FANTASY, Genre.ADVENTURE],
		seasons: 1,
		episodes: 12,
		featured: false,
	},
	{
		id: '3',
		title: 'Spy Classroom Season 2',
		imagePath:
			'https://static.bunnycdn.ru/i/cache/images/a/af/af8881688738f4b3184416efa1bc457d.jpg',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo nobis facere harum? Iste inventore officia temporibus recusandae minus aut unde labore blanditiis, vel consequatur rem voluptatum, ad minima aperiam omnis.',
		genre: [Genre.ACTION, Genre.MYSTERY],
		seasons: 2,
		episodes: 13,
		featured: true,
	},
];
