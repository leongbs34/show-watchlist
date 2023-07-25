import { Progress, Title, rem } from '@mantine/core';
import { Carousel as MantineCarousel, Embla } from '@mantine/carousel';
import styled from '@emotion/styled';
import { animes } from '../../data/animeData';
import {
	CarouselActionType,
	carouselReducer,
	initialState,
} from './carouselReducer';
import { useCallback, useEffect, useReducer, useRef } from 'react';
import emblaCarouselAutoplay from 'embla-carousel-autoplay';
import FeaturedCard from './FeaturedCard';

const slides = animes
	.filter(anime => anime.featured)
	.map(featuredAnime => (
		<MantineCarousel.Slide key={featuredAnime.id}>
			<FeaturedCard
				image={featuredAnime.imagePath}
				title={featuredAnime.title}
				genres={featuredAnime.genre}
				seasons={featuredAnime.seasons}
				episodes={featuredAnime.episodes}
			/>
		</MantineCarousel.Slide>
	));

const FeaturedItemsHeader = styled(Title)`
	letter-spacing: ${rem(1.5)};
	line-height: 1;
	font-size: ${rem(16)};
	margin-bottom: ${rem(8.19)};
	margin-inline: ${({ theme }) => theme.spacing.xs};
`;

const Section = styled('section')`
	margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export default function FeaturedItems() {
	const [carouselState, dispatch] = useReducer(carouselReducer, initialState);
	const autoplay = useRef(emblaCarouselAutoplay({ delay: 5000 }));

	const setScrollProgress = (progress: number) => {
		dispatch({ type: CarouselActionType.SCROLL, progress: progress * 100 });
	};

	const setEmbla = (embla: Embla) => {
		dispatch({ type: CarouselActionType.EMBLA, embla });
	};

	const handleScroll = useCallback(() => {
		if (!carouselState.embla) return;
		const progress = Math.max(
			0,
			Math.min(1, carouselState.embla.scrollProgress())
		);
		setScrollProgress(progress);
	}, [carouselState.embla, setScrollProgress]);

	useEffect(() => {
		if (carouselState.embla) {
			carouselState.embla.on('scroll', handleScroll);
			handleScroll();
		}
	}, [carouselState.embla]);

	return (
		<Section>
			<FeaturedItemsHeader order={2} transform='uppercase'>
				Featured
			</FeaturedItemsHeader>
			<MantineCarousel
				loop
				slideSize='100%'
				align='start'
				getEmblaApi={setEmbla}
				plugins={[autoplay.current]}
				onMouseEnter={autoplay.current.stop}
				onMouseLeave={autoplay.current.reset}
			>
				{slides}
			</MantineCarousel>
			<Progress
				value={carouselState.scrollProgress}
				styles={{
					bar: { transitionDuration: '0ms' },
				}}
				size='sm'
				mx='auto'
			/>
		</Section>
	);
}
