import { useParams } from 'react-router-dom';

export default function Show() {
	const params = useParams<{ showId: string }>();

	return (
		<>
			<span>Show {params.showId}</span>
		</>
	);
}
