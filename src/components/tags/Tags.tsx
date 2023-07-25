import { Badge, Flex, FlexProps, rem } from '@mantine/core';
import { Genre } from '../model/Genre.model';
import styled from '@emotion/styled';
import { useMemo } from 'react';

export default function Tags({ genres, mb }: { genres: Genre[]; mb?: string }) {
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
