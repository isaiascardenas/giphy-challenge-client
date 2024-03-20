import { useEffect, useState } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { fetchGifs } from "../redux/features/gifSlice";
import Pagination from "./widgets/Pagination";
import SearchInput from "./widgets/SearchInput";
import Utils from "./../utils";

const List = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const [searchInput, setSearchInput] = useState("");
  const gifsState = useAppSelector((state) => state.gif);

  useEffect(() => {
    dispatch(fetchGifs(Utils.decodeSearchParams(searchParams)));
  }, [searchParams]);

  const handleSearchInput = (query: string) => {
    if (query.length > 0) {
      const params = Utils.decodeSearchParams(searchParams);
      params.query = query;
      setSearchParams(Utils.encodeSearchParams(params));
    } else {
      setSearchParams("");
    }
    setSearchInput(query);
  };

  return (
    <>
      <div className="container mx-auto px-4 md:px-12">
        <h1 className="text-center text-xl font-bold py-8">
          Gif's challenge{" "}
          <span className="text-xs text-gray-400 font-normal">by Isaias Cardenas</span>
        </h1>
        <div className="flex-grow border-t my-4 border-gray-400"></div>
        <div className="flex justify-between py-4">
          <SearchInput
            value={searchInput}
            onChange={handleSearchInput}
            className="p-2 border-solid border border-gray-400 rounded-md w-1/2"
          />
          <Link
            to="/crear"
            className="py-2 px-8 bg-gray-500 rounded-md text-white hover:bg-gray-600"
          >
            Add Gif
          </Link>
        </div>
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {gifsState.loading && (
            <div className="text-center w-full py-4 text-xl">Loading...</div>
          )}
          {!gifsState.loading && gifsState.error ? (
            <div className="text-center py-4 text-xl">
              Error: {gifsState.error}
            </div>
          ) : null}
          {!gifsState.loading && gifsState.gifs.length
            ? gifsState.gifs.map((gif) => (
                <div
                  key={gif.id}
                  className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
                >
                  <article className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-50">
                    <Link to={"/editar/" + gif.id}>
                      <img
                        alt="Animated gif"
                        className="block h-auto w-full md:h-80"
                        src={gif.url}
                      />
                    </Link>

                    <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                      <h4 className="text-lg truncate">
                        <a
                          className="no-underline hover:underline text-black text-ellipsis"
                          href="#"
                        >
                          {gif.title}
                        </a>
                      </h4>
                    </header>

                    <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                      <p className="text-grey-darker text-sm">
                        {gif.created_at.split("T")[0]}
                      </p>
                    </footer>
                  </article>
                </div>
              ))
            : null}
        </div>
        <Pagination paginator={gifsState.paginator}></Pagination>
      </div>
    </>
  );
};

export default List;
