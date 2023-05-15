import { useState, useEffect } from "react";
import { fetchMovieData } from "../utils/api";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);

    fetchMovieData(url)
      .then((res) => {
        setLoading(false);
        setData(res);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  }, [url]);

    return {data, loading, error}
};

export default useFetch;
