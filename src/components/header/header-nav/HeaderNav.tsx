import styled from '@emotion/styled';
import { NavLink } from '@mantine/core';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { changeActiveNav } from '../../../redux/slices/activeNavSlice';

const NavItem = styled.div`
	display: flex;
	align-items: center;
	font-size: rem(16);
	gap: ${({ theme }) => theme.spacing.xs};
`;

const links = [
	{
		icon: BookmarksIcon,
		href: 'watchlist',
		label: 'Watchlist',
	},
	{
		icon: BookmarksIcon,
		href: 'test',
		label: 'Test',
	},
];

export default function HeaderNav({ toggleMenu }: { toggleMenu?: () => void }) {
	const dispatch = useAppDispatch();
	const currentActiveNav = useAppSelector(state => state.activeNav.active);

	const setActive = (href: string) => {
		dispatch(changeActiveNav(href));
	};

	const closeMenu = () => {
		if (toggleMenu) {
			toggleMenu();
		}
	};

	return (
		<>
			{links.map(link => (
				<NavItem key={link.href}>
					<NavLink
						component={Link}
						to={link.href}
						label={link.label}
						icon={<link.icon />}
						onClick={() => {
							closeMenu();
							setActive(link.href);
						}}
						active={currentActiveNav === link.href}
					/>
				</NavItem>
			))}
		</>
	);
}
