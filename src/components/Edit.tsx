import { useEffect, useState, useRef } from "react";
import { Link, useParams, redirect } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { deleteGif, getGif, updateGif } from "../redux/features/gifSlice";
import FileUploader from "./widgets/FileUploader";

function Edit() {
  const imageMimeType = /image\/(png|jpg|jpeg|gif)/i;
  const routeParams = useParams();
  const dispatch = useAppDispatch();

  const gifsState = useAppSelector((state) => state.gif);

  const fileInputRef = useRef(null);
  const [titleValue, setTitleValue] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [fileValue, setFileValue] = useState(null);

  useEffect(() => {
    if (routeParams.id) {
      dispatch(getGif(routeParams.id));
    }
  }, [routeParams]);

  useEffect(() => {
    if (gifsState.selection && gifsState.selection.id) {
      setTitleValue(gifsState.selection.title);
      setFileUrl(gifsState.selection.url);
    }
  }, [gifsState.selection]);

  const handleFile = (file: any) => {
    if (file) {
      if (!file.type.match(imageMimeType)) {
        alert("Image mime type is not valid");
        return;
      }
    } else {
      setFileUrl("");
    }
    setFileValue(file);
  };

  useEffect(() => {
    if (fileValue) {
      setFileUrl(URL.createObjectURL(fileValue));
    } else {
      setFileUrl("");
    }
  }, [fileValue]);

  const submitForm = () => {
    try {
      dispatch(
        updateGif({
          title: titleValue,
          url: fileUrl,
        }),
      );

      redirect("/");
    } catch (error: any) {
      console.log(error.message);
    } finally {
      resetForm();
    }
  };

  const resetForm = () => {
    if (gifsState.selection && gifsState.selection.id) {
      setTitleValue(gifsState.selection.title);
      setFileUrl(gifsState.selection.url);
    } else {
      setTitleValue("");
      setFileUrl("");
    }
    setFileValue(null);
  };

  const handleDelete = () => {
    let confirmDelete = confirm("Are you sure you want to delete this file?");

    if (confirmDelete && routeParams.id) {
      try {
        dispatch(deleteGif(routeParams.id));

        redirect("/");
      } catch (error: any) {
        console.log(error.message);
      } finally {
        resetForm();
      }
    }
  };

  return (
    <>
      <div className="container mx-auto mb-8 px-4 md:px-12">
        <h1 className="text-center text-xl font-bold py-8">Edit Gif</h1>
        <div className="flex-grow border-t my-4 border-gray-400"></div>
        <div className="flex">
          <Link
            to="/"
            className="py-2 px-8 flex items-center bg-white rounded-md font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
            Back
          </Link>
        </div>
        {gifsState.loading && (
          <div className="text-center w-full py-4 text-xl">Loading...</div>
        )}
        {!gifsState.loading && gifsState.error ? (
          <div className="text-center py-4 text-xl">
            Error: {gifsState.error}
          </div>
        ) : null}
        {!gifsState.loading && gifsState.selection ? (
          <div className="mx-auto max-w-2xl">
            <div className="border-b border-gray-900/10 pb-8">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-full">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Title
                  </label>
                  <input
                    type="text"
                    className="p-2 border-solid border border-gray-400 rounded-md w-full"
                    placeholder=""
                    value={titleValue}
                    onChange={(e) => setTitleValue(e.target.value)}
                  />
                </div>

                <div className="sm:col-span-full">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    File
                  </label>
                  <div className="w-full focus:outline-none">
                    {fileUrl && fileUrl.length > 0 ? (
                      <div className="w-full md:bg-gray-200 md:py-4">
                        <img
                          alt="Animated gif"
                          className="block h-auto w-full md:mx-auto md:w-2/3 md:h-80"
                          src={fileUrl}
                        />
                      </div>
                    ) : null}

                    {!fileUrl || fileUrl.length == 0 ? (
                      <FileUploader handleFile={handleFile}></FileUploader>
                    ) : null}
                    <div className="w-full flex items-center justify-end">
                      {fileUrl && fileUrl.length > 0 ? (
                        <button
                          type="button"
                          onClick={() => handleFile(null)}
                          className="mt-2 ml-4 rounded px-3 py-1 text-sm text-white bg-gray-500 focus:outline-none hover:bg-gray-600"
                        >
                          Edit file
                        </button>
                      ) : null}
                    </div>
                    <input
                      className="w-0 h-0 hidden"
                      type="file"
                      ref={fileInputRef}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full mt-8 flex justify-between">
              <button
                onClick={handleDelete}
                className="py-2 px-8 bg-red-500 rounded-md text-white hover:bg-red-600"
              >
                Delete
              </button>
              <div className="w-full flex justify-end gap-4">
                <button
                  onClick={() => redirect("/")}
                  className="py-2 px-8 border border-solid border-gray-500 bg-white rounded-md text-gray-500 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={submitForm}
                  className="py-2 px-8 bg-gray-500 rounded-md text-white hover:bg-gray-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Edit;
