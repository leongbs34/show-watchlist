import { useEffect, useState } from 'react';
import {
	ColorScheme,
	ColorSchemeProvider,
	MantineProvider,
	MantineThemeOverride,
} from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import Main from './page/main/Main';
import Root from './page/Root';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Watchlist from './page/watchlist/Watchlist';
import Show from './page/show/Show';
import Error from './page/error/Error';

export default function App() {
	const preferredColorScheme = useColorScheme();
	const [colorScheme, setColorScheme] =
		useState<ColorScheme>(preferredColorScheme);
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

	useEffect(() => {
		setColorScheme(preferredColorScheme);
	}, [preferredColorScheme]);

	const mantineTheme: MantineThemeOverride = {
		colorScheme,
		fontFamily: 'Roboto, sans-serif',
		globalStyles: theme => ({
			body: {
				backgroundColor:
					theme.colorScheme === 'dark'
						? theme.colors.dark[6]
						: theme.colors.gray[0],
				color:
					theme.colorScheme === 'dark'
						? theme.colors.gray[4]
						: theme.colors.gray[8],
			},
		}),
	};

	const router = createBrowserRouter([
		{
			path: '/',
			element: <Root />,
			errorElement: <Error />,
			children: [
				{
					index: true,
					element: <Main />,
				},
				{
					path: 'watchlist',
					element: <Watchlist />,
				},
				{
					path: 'shows/:showId',
					element: <Show />,
				},
			],
		},
	]);

	return (
		<ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}
		>
			<MantineProvider
				theme={mantineTheme}
				withCSSVariables
				withGlobalStyles
				withNormalizeCSS
			>
				<Provider store={store}>
					<RouterProvider router={router} />
				</Provider>
			</MantineProvider>
		</ColorSchemeProvider>
	);
}
