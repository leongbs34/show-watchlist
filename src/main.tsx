import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Header from './components/header/Header.tsx';
import Root from './page/root/Root.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		// errorElement: <ErrorPage />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Header />
		<RouterProvider router={router} />
	</React.StrictMode>
);
