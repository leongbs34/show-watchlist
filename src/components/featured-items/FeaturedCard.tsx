import {
	Flex,
	Paper,
	PaperProps,
	Text,
	TextProps,
	Title,
	rem,
	useMantineTheme,
} from '@mantine/core';
import styled from '@emotion/styled';
import Tags from '../tags/Tags';
import Anime from '../model/Anime.model';
import useAppNavigate from '../../hooks/useAppNavigate';

interface FeaturedCardProps {
	show: Anime;
}

const Background = styled(Paper)<PaperProps>`
	height: ${rem(440)};
	background-size: cover;
	background-position: center;
	position: relative;

	&::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-image: ${({ theme }) => `linear-gradient(
			to top,
			${theme.colors.dark[6]} 0%,
			rgba(33, 37, 41, 0.757) 30%,
			rgba(52, 58, 64, 0.598) 50%,
			rgba(73, 80, 87, 0) 70%
		)`};
	}
`;

const CardDetails = styled(Flex)`
	position: absolute;
	flex-direction: column;
	bottom: 0;
	left: 0;
	z-index: 1;
	padding-inline: ${({ theme }) => theme.spacing.xs};
`;

const CardTitle = styled(Title)`
	color: ${({ theme }) => theme.white};
	line-height: 1.1;
	font-size: ${rem(32)};
	margin-bottom: ${({ theme }) => theme.spacing.sm};

	&:hover {
		cursor: pointer;
	}
`;

const ShowDetails = styled(Flex)`
	gap: ${rem(8.19)};
`;

const ShowDetailsText = styled(Text)<TextProps>`
	text-transform: uppercase;
	font-size: ${rem(12.8)};
	font-weight: 500;
	letter-spacing: 0.75px;
	color: ${({ theme }) =>
		theme.colorScheme === 'dark' ? '' : theme.colors.gray[4]};
`;

export default function FeaturedCard({ show }: FeaturedCardProps) {
	const theme = useMantineTheme();
	const handleAppNavigate = useAppNavigate();
	const {
		id: showId,
		imagePath,
		seasons,
		episodes,
		title,
		genre: genres,
	} = show;

	return (
		<Background
			shadow='md'
			radius='xs'
			sx={{ backgroundImage: `url(${imagePath})` }}
		>
			<CardDetails>
				<ShowDetails>
					<ShowDetailsText>
						{seasons} {seasons === 1 ? 'season' : 'seasons'}
					</ShowDetailsText>
					<ShowDetailsText>
						{episodes} {episodes === 1 ? 'episode' : 'episodes'}
					</ShowDetailsText>
				</ShowDetails>
				<CardTitle
					order={3}
					lineClamp={2}
					transform='capitalize'
					onClick={() => {
						handleAppNavigate('shows', showId);
					}}
				>
					{title}
				</CardTitle>
				<Tags genres={genres} mb={theme.spacing.md} />
			</CardDetails>
		</Background>
	);
}
