import { Suspense, useEffect } from 'react';
import Header from '../components/header/Header';
import { Outlet } from 'react-router-dom';
import LoadingPage from './loading/LoadingPage';
import localforage from 'localforage';
import { setWatchlist, showsType } from '../redux/slices/watchlistSlice';
import { useAppDispatch } from '../redux/hooks';

export default function Root() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		localforage
			.getItem('watchlist')
			.then(value => {
				// This code runs once the value has been loaded
				// from the offline store.
				if (value != null) dispatch(setWatchlist(value as showsType));
			})
			.catch(err => {
				// This code runs if there were any errors
				console.log(err);
			});
	}, []);

	return (
		<>
			<Header />
			<Suspense fallback={<LoadingPage />}>
				<Outlet />
			</Suspense>
		</>
	);
}
