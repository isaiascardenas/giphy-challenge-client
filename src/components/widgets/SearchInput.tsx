import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Utils from "./../../utils";

interface Props {
  className?: string;
  value: string;
  onChange: (event: string) => void;
}

const SearchInput = ({ className, value, onChange }: Props) => {
  const [inputValue, setInputValue] = useState(value);
  const [searchParams, _] = useSearchParams();

  useEffect(() => {
    const params = Utils.decodeSearchParams(searchParams);
    console.log(params);
    if (params.query) {
      setInputValue(params.query);
    }
  }, []);

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onChange(inputValue);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [inputValue, 500]);

  return (
    <input
      type="text"
      className={className}
      placeholder="Buscar gif"
      value={inputValue}
      onChange={handleInputChange}
    />
  );
};

export default SearchInput;
