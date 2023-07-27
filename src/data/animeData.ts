import Anime from '../components/model/Anime.model';
import { Genre } from '../components/model/Genre.model';

export const animes: Anime[] = [
	{
		id: '1',
		title: 'One Piece',
		imagePath:
			'https://static.bunnycdn.ru/i/cache/images/5/58/5806a16f2892768b4930c39ebf6ce756.jpg',
		description: `Gol D. Roger was dubbed the "Pirate King" due to his outstanding power and feared dominance over the Grand Line's seas. The Global authorities' seizure and execution of Roger caused a global uproar. However, before his death, Roger disclosed the remarkable existence of One Piece, the world's most coveted treasure. This revelation triggered the onset of the Grand Age of Pirates, brave sailors willing to undertake perilous journeys in pursuit of the immeasurable wealth and prestige that One Piece offered.
			Monkey D. Luffy, an unconventional 17-year-old, answered this call to adventure. Luffy's personality does not fit the typical pirate stereotype; he is not cruel or savage, instead seeking exciting escapades, the thrill of exploration, and the chance to meet fascinating individuals while searching for One Piece. Luffy and his crew set sail, embarking on a daring odyssey teeming with fantastic adventures, perplexing mysteries, and epic battles to lay claim to One Piece's unparalleled legacy, just as Luffy's childhood hero did.`,
		genre: [
			Genre.ACTION,
			Genre.ADVENTURE,
			Genre.COMEDY,
			Genre.DRAMA,
			Genre.FANTASY,
			Genre.SHOUNEN,
		],
		seasons: 1,
		episodes: 1069,
		featured: true,
		studios: ['Toei Animation'],
		producers: [
			'Fuji TV',
			'Asatsu DK',
			'Avex Pictures',
			'TAP',
			'Studio Guts',
			'Asahi Production',
			'Mushi Production',
			'Magic Bus',
			'4Kids Entertainment',
			'Funimation',
		],
	},
	{
		id: '2',
		title: 'The Most Heretical Last Boss Queen: From Villainess to Savior',
		imagePath:
			'https://static.bunnycdn.ru/i/cache/images/e/e4/e48e309b616c79281aceef18ec75e2c2.jpg',
		description: `At the tender age of eight, Pride Royal Ivy discovers that she has been reborn as the notorious villain and ultimate obstacle in an otome game. Armed with a quick tongue, formidable abilities, and the power of being crown princess, she sets out to bring chaos and doom to her kingdom. However, upon reflection, she realizes that such a fate is unacceptable. Instead, she decides to change the game by protecting the male love interests and manipulating the system to spare as many lives as possible. Will this once-wicked final boss find herself revered by her people?`,
		genre: [Genre.FANTASY, Genre.COMEDY, Genre.ROMANCE],
		seasons: 1,
		episodes: 12,
		featured: false,
		studios: ['OLM Team Yoshioka'],
		producers: ['Nichion', 'Myrica Music'],
	},
	{
		id: '3',
		title: 'Jujutsu Kaisen Season 2',
		imagePath:
			'https://static.bunnycdn.ru/i/cache/images/3/3f/3f7a34f05d6791a52fa735a4229caee2.jpg',
		description: `Jujutsu Kaisen's second season`,
		genre: [
			Genre.ACTION,
			Genre.DRAMA,
			Genre.FANTASY,
			Genre.SUPERNATURAL,
			Genre.SHOUNEN,
		],
		seasons: 2,
		episodes: 23,
		featured: true,
		studios: ['MAPPA'],
		producers: [
			'Shueisha',
			'Mainichi Broadcasting System',
			'TOHO animation',
			'dugout',
			'Sumzap',
		],
	},
	{
		id: '4',
		title: 'Demon Slayer: Kimetsu no Yaiba Swordsmith Village Arc',
		imagePath:
			'https://static.bunnycdn.ru/i/cache/images/2/29/296d2e5f02e3af48aea3750e05d9ce81.jpg',
		description: `The Swordsmith Village Arc has been adapted, with the first episode lasting approximately 49 minutes. Additionally, the episode was shown early in theaters globally, as part of a unique screening in conjunction with the last two episodes of Kimetsu no Yaiba: Yuukaku-hen.`,
		genre: [
			Genre.ACTION,
			Genre.ADVENTURE,
			Genre.DRAMA,
			Genre.FANTASY,
			Genre.SUPERNATURAL,
			Genre.SHOUNEN,
		],
		seasons: 3,
		episodes: 11,
		featured: true,
		studios: ['ufotable'],
		producers: ['Shueisha', 'Aniplex', 'Aniplex of America'],
	},
];
