import { Carousel } from '@mantine/carousel';
import { Genre } from '../model/Genre.model';
import {
	rem,
	useMantineTheme,
	Badge,
	UnstyledButton,
	UnstyledButtonProps,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import styled from '@emotion/styled';
import React, { useContext, useMemo } from 'react';
import FilterContext from '../../context/FilterContext';

type TagButtonProps =
	| UnstyledButtonProps
	| React.HTMLAttributes<HTMLButtonElement>;

const TagButton = styled(UnstyledButton)<TagButtonProps>`
	&:hover .mantine-Badge-root {
		background: ${({ theme }) => theme.colors.blue[5]};
		color: ${({ theme }) => theme.colors.blue[0]};
	}
`;

const MantineCarousel = styled(Carousel)`
	margin-bottom: ${({ theme }) => theme.spacing.xl};

	.mantine-Carousel-control[data-inactive] {
		opacity: 0;
		cursor: 'default';
	}

	.mantine-Carousel-slide:not(:last-child) {
		margin-right: ${rem(8)};
	}
`;

export default function Filter() {
	const theme = useMantineTheme();
	const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
	const { changeCurrentGenre, currentGenre } = useContext(FilterContext);

	const slides = useMemo(
		() =>
			Object.values(Genre).map(genre => (
				<Carousel.Slide key={genre}>
					<TagButton
						onClick={() => {
							changeCurrentGenre(genre);
						}}
					>
						<Badge variant={genre === currentGenre ? 'filled' : 'light'}>
							{genre}
						</Badge>
					</TagButton>
				</Carousel.Slide>
			)),
		[changeCurrentGenre, currentGenre]
	);

	return (
		<MantineCarousel
			slideSize='10%'
			dragFree
			align='center'
			slidesToScroll={mobile ? 1 : 2}
		>
			{slides}
		</MantineCarousel>
	);
}
