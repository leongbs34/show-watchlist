import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import { changeActiveNav } from '../redux/slices/activeNavSlice';

export default function useAppNavigate() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleNavigate = (urlPath: string, params: string) => {
		dispatch(changeActiveNav(urlPath));
		navigate(`${urlPath === '/' ? '' : urlPath}/${params}`);
	};

	return handleNavigate;
}
