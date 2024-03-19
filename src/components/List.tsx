import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { fetchGifs } from "../redux/features/gifSlice";

const List = () => {
	const dispatch = useAppDispatch();
	const gifsState = useAppSelector((state) => state.gif);

	useEffect(() => {
		dispatch(fetchGifs());
	}, []);

	return (
		<>
			<div className="rounded-md shadow border m-2 p-2">
				<p>This is List Components</p>
				<table className="rounded-md">
					<thead>
						<tr className="bg-gradient-to-b from-sky-400 to-sky-600 text-white  ">
							<th className="p-2 border rounded">ID</th>
							<th className="p-2 border rounded">Name</th>
						</tr>
					</thead>
					<tbody>
						{gifsState.loading && <tr><td>Loading...</td></tr>}
						{!gifsState.loading && gifsState.error ? <tr><td>Error: {gifsState.error}</td></tr> : null}
						{!gifsState.loading && gifsState.gifs.length ? gifsState.gifs.map((gif) => (
							<tr className="even:bg-slate-50" key={gif.id}>
								<td className="p-2">{gif.id}</td>
								<td className="p-2">{gif.name}</td>
							</tr>
						)) : null}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default List;
