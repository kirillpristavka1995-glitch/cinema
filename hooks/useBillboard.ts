"use client";

import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useBillboard = () => {
  const { data, error, isLoading } = useSWR("/api/movies/random", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false, 
    revalidateOnReconnect: false,
  });

  return {
    movie: data,
    isLoading,
    isError: error,
  };
}

export default useBillboard;
