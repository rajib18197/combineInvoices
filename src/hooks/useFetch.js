import { useEffect, useState } from "react";

const API_URL = "https://jsonplaceholder.typicode.com";

export default function useFetch(currentPage = 1) {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(
    function () {
      async function fetchData() {
        try {
          setIsLoading(true);
          setError(null);

          const response = await fetch(`${API_URL}/posts?_page=${currentPage}`);
          const data = await response.json();
          console.log(data);
          setHasNextPage(data.length);
          setResults((results) => [...results, ...data]);
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          setError({ message: err.message, code: err.status, isError: true });
        }
      }

      fetchData();
    },
    [currentPage]
  );

  return { isLoading, results, error, hasNextPage };
}
