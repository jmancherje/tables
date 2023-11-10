"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

async function fetchMovieSuggestions(search: string) {
  const res = await fetch(`/api/searchMovies?search=${encodeURI(search)}`);
  return await res.json();
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [movies, setRows] = useState<MovieWithRawInfo[]>([]);

  const debouncedSearch = useDebouncedValue(search);

  useEffect(() => {
    async function searchMovies(s: string) {
      const { data } = await fetchMovieSuggestions(s);
      console.log({ data });
      setRows(data);
    }

    searchMovies(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <main style={{ padding: "20px" }}>
      <h1>Hi Joey</h1>
      <p>Beautiful</p>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="search"
      />
      {movies.map((movie) => (
        <SuggestionRow key={movie.href} movie={movie} />
      ))}
    </main>
  );
}

function SuggestionRow({ movie }: { movie: MovieWithRawInfo }) {
  return (
    <div style={{ display: "flex" }}>
      <Image alt={movie.name} src={movie.images[0]} width="60" height="60" />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p>{movie.name}</p>
        <p>{movie.href}</p>
      </div>
    </div>
  );
}

function useDebouncedValue(value: string, delay = 250): string {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}
