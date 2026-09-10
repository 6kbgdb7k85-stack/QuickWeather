import { useState } from "react";
import { apiUrls } from "../common/constants";


export default function useApi(api) {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  function runApi(params) {
    setIsLoading(true);
    fetch(compileUrl(params))
      .then((r) => {
        setIsLoading(false)
        if (!r.ok) {
          throw new Error("API Error");
        }
        setIsLoading(false)
        return r.json();
      })
      .then((data) => setResponse(data))
      .catch((err) => console.warn(err));
  }

  function compileUrl(params) {
    let urlString = apiUrls[api];
    Object.keys(params).forEach((k) => {
      urlString += `&${k}=${params[k]}`
    });
    return urlString;
  }

  return { isLoading, response, runApi };
}
