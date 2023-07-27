import { Progress, createStyles, rem } from '@mantine/core';
import { Carousel as MantineCarousel, Embla } from '@mantine/carousel';
import { animes } from '../../data/animeData';
import { useCallback, useEffect, useRef, useState } from 'react';
import emblaCarouselAutoplay from 'embla-carousel-autoplay';
import FeaturedCard from './FeaturedCard';

const slides = animes
	.filter(anime => anime.featured)
	.map(featuredAnime => (
		<MantineCarousel.Slide key={featuredAnime.id}>
			<FeaturedCard show={featuredAnime} />
		</MantineCarousel.Slide>
	));

const useStyles = createStyles(theme => ({
	header: {
		letterSpacing: rem(1.5),
		lineHeight: 1,
		fontSize: rem(16),
		marginBottom: rem(8.19),
		marginInline: theme.spacing.xs,
		textTransform: 'uppercase',

		[theme.fn.largerThan('lg')]: {
			fontSize: rem(20),
		},
	},

	section: {
		marginBottom: theme.spacing.lg,
	},
}));

export default function FeaturedItems() {
	const autoplay = useRef(emblaCarouselAutoplay({ delay: 5000 }));
	const { classes } = useStyles();
	const [scrollProgress, setScrollProgress] = useState(0);
	const [embla, setEmbla] = useState<Embla | null>(null);

	const handleScroll = useCallback(() => {
		if (!embla) return;
		const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
		setScrollProgress(progress * 100);
	}, [embla, setScrollProgress]);

	useEffect(() => {
		if (embla) {
			embla.on('scroll', handleScroll);
			handleScroll();
		}
	}, [embla]);

	return (
		<section className={classes.section}>
			<h2 className={classes.header}>Featured</h2>
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
				value={scrollProgress}
				styles={{
					bar: { transitionDuration: '0ms' },
				}}
				size='sm'
				mx='auto'
			/>
		</section>
	);
}
