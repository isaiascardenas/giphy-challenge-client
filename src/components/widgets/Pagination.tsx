import { useSearchParams } from "react-router-dom";
import { Paginator } from "./../../redux/features/gifSlice";
import Utils from "./../../utils";

export interface Params {
  paginator: Paginator;
}

function Pagination({ paginator }: Params) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChangePage = (step: number) => {
    const nextPage = paginator.page + step;
    const params = Utils.decodeSearchParams(searchParams);
    params.page = nextPage;
    setSearchParams(Utils.encodeSearchParams(params));
  };

  return (
    <>
      <div className="w-full flex justify-center my-4">
        <nav className="inline-flex items-center p-1 rounded bg-white space-x-2">
          <button
            type="button"
            disabled={paginator.page == 1}
            className={
              "p-1 rounded border text-black bg-white hover:bg-gray-100 hover:border-gray-600" +
              (paginator.page == 1
                ? " cursor-not-allowed bg-gray-100 text-gray-400 hover:border-gray-100"
                : "")
            }
            onClick={() => handleChangePage(-1)}
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </button>
          <p className="text-gray-500">
            Page {paginator.page} of {paginator.totalPages}
          </p>
          <button
            type="button"
            disabled={paginator.page == paginator.totalPages}
            className={
              "p-1 rounded border text-black bg-white hover:bg-gray-100 hover:border-gray-600" +
              (paginator.page == paginator.totalPages
                ? " cursor-not-allowed bg-gray-100 text-gray-400 hover:border-gray-100"
                : "")
            }
            onClick={() => handleChangePage(1)}
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </button>
        </nav>
      </div>
    </>
  );
}

export default Pagination;
