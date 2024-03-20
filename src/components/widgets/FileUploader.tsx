import { useRef } from "react";

interface Props {
  handleFile: (event: string) => void;
}

function FileUploader({ handleFile }: Props) {
  const hiddenFileInput = useRef(null);

  const handleClick = (_: any) => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const handleChange = (event: any) => {
    const fileUploaded = event.target.files[0];
    handleFile(fileUploaded);
  };

  return (
    <>
      <button
        onClick={handleClick}
        type="button"
        className="focus:outline-none p-4 w-full rounded-md text-center border-dashed border-2 border-gray-300"
      >
        <svg
          className="w-8 h-8 mb-4 text-gray-400 mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 16"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
          />
        </svg>
        <p className="mb-2 text-sm text-gray-500">
          <span className="font-semibold">Click to upload</span>
        </p>
        <p className="text-xs text-gray-500">
          SVG, PNG, JPG or GIF (MAX. 800x400px)
        </p>
      </button>
      <input
        type="file"
        name="file-input"
        accept=".png, .jpg, .jpeg, .gif"
        onChange={handleChange}
        ref={hiddenFileInput}
        className="w-0 h-0 hidden"
      />
    </>
  );
}

export default FileUploader;
