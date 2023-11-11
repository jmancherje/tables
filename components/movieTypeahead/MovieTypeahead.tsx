"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

async function movieTypeahead(search: string) {
  const res = await fetch(`/api/searchMovies?search=${encodeURI(search)}`);
  return await res.json();
}

export function MovieTypeahead() {
  const [search, setSearch] = useState("");
  const [movies, setRows] = useState<MovieWithRawInfo[]>([]);

  const debouncedSearch = useDebouncedValue(search);

  useEffect(() => {
    async function searchMovies(s: string) {
      const { data } = await movieTypeahead(s);
      setRows(data);
    }

    searchMovies(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="search"
      />
      {movies.map((movie) => (
        <SuggestionRow key={movie.href} movie={movie} />
      ))}
    </div>
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
