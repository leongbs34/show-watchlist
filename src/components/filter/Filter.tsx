import { MouseEvent, useContext, useRef, useState } from 'react';
import styles from './Filter.module.css';
import { Badge, UnstyledButton, UnstyledButtonProps } from '@mantine/core';
import { Genre } from '../model/Genre.model';
import styled from '@emotion/styled';
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

export default function CarouselCopy() {
	const [isDragStart, setIsDragStart] = useState(false);
	const carouselRef = useRef<HTMLDivElement>(null);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);
	const navLeftRef = useRef<HTMLButtonElement>(null);
	const navRightRef = useRef<HTMLButtonElement>(null);
	const { changeCurrentGenre, currentGenre } = useContext(FilterContext);

	let offsetPos: number;

	const changeFeaturedItem = (direction: 'left' | 'right') => {
		let clientWidth = carouselRef.current!.clientWidth;
		clientWidth = direction === 'left' ? -clientWidth : clientWidth;

		carouselRef.current!.scrollBy(clientWidth, 0);
	};

	const dragStop = () => {
		setIsDragStart(false);
	};

	const dragStart = (e: MouseEvent) => {
		setIsDragStart(true);

		setStartX(e.pageX - carouselRef.current!.offsetLeft);

		setScrollLeft(carouselRef.current!.scrollLeft);
	};

	const dragging = (e: MouseEvent) => {
		const mouseOverElementIsImg =
			(e.target as HTMLElement).classList.value === styles['img-container'];
		if (mouseOverElementIsImg) {
			e.preventDefault();
		}

		if (!isDragStart) return;
		offsetPos = e.pageX - startX;
		carouselRef.current!.scrollLeft = scrollLeft - offsetPos;
	};

	return (
		<section className={styles['section-carousel']}>
			<div className={styles.container}>
				<div className={styles['carousel']}>
					<button
						className={styles['carousel-nav-left']}
						onClick={() => {
							changeFeaturedItem('left');
						}}
						ref={navLeftRef}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className={`w-6 h-6 ${styles['carousel-nav-icon']}`}
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15.75 19.5L8.25 12l7.5-7.5'
							/>
						</svg>
					</button>

					<div
						className={`${styles['carousel-items']} ${
							isDragStart && styles.active
						}`}
						ref={carouselRef}
						onMouseDown={dragStart}
						onMouseMove={dragging}
						onMouseUp={dragStop}
						onMouseLeave={dragStop}
					>
						{Object.values(Genre).map(genre => (
							<TagButton
								key={genre}
								onClick={() => {
									changeCurrentGenre(genre);
								}}
							>
								<Badge variant={genre === currentGenre ? 'filled' : 'light'}>
									{genre}
								</Badge>
							</TagButton>
						))}
					</div>

					<button
						className={styles['carousel-nav-right']}
						onClick={() => {
							changeFeaturedItem('right');
						}}
						ref={navRightRef}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className={`w-6 h-6 ${styles['carousel-nav-icon']}`}
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M8.25 4.5l7.5 7.5-7.5 7.5'
							/>
						</svg>
					</button>
					<nav className='carousel-nav'></nav>
				</div>
			</div>
		</section>
	);
}
