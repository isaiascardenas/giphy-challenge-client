import { createSearchParams } from "react-router-dom";

class Utils {
  static encodeSearchParams(params: any) {
    return createSearchParams(params);
  }

 static decodeSearchParams(searchParams: Array<string>) {
    return [...searchParams.entries()].reduce((acc, [key, val]) => {
      try {
        return {
          ...acc,
          [key]: JSON.parse(val),
        };
      } catch {
        return {
          ...acc,
          [key]: val,
        };
      }
    }, {});
  };
}

export default Utils;
