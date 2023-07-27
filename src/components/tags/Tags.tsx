import { Badge, Flex, FlexProps, rem } from '@mantine/core';
import { Genre } from '../model/Genre.model';
import styled from '@emotion/styled';
import { useMemo } from 'react';

type TagsProps = { genres: Genre[]; mb?: string };

export default function Tags({ genres, mb }: TagsProps) {
	const Genres = useMemo(
		() => styled(Flex)<FlexProps>`
			column-gap: ${({ theme }) => theme.spacing.xs};
			row-gap: ${rem(6.55)};
			margin-bottom: ${mb};
		`,
		[mb]
	);

	return (
		<Genres wrap={'wrap'}>
			{genres.map(genre => (
				<Badge variant='filled' key={genre}>
					{genre}
				</Badge>
			))}
		</Genres>
	);
}
