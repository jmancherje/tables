"use client";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

async function getSuggestions(): Promise<{ suggestions: MovieWithRawInfo[] }> {
  const res = await fetch("/api/movieSuggestions");
  return await res.json();
}

type Opinion = "like" | "dislike";
type OpinionMap = Record<string, Opinion>;
export function Suggestions() {
  const [suggestions, setSuggestions] = useState<MovieWithRawInfo[]>([]);
  const [checked, setChecked] = useState<OpinionMap>({});

  const fetched = useRef(false);
  useEffect(() => {
    if (fetched.current) {
      return;
    }
    fetched.current = true;
    async function fetchSuggestions() {
      const res = await getSuggestions();
      setSuggestions(res.suggestions);
    }

    fetchSuggestions();
  }, []);

  return (
    <div>
      {suggestions.slice(0, 5).map((movie) => (
        <Suggestion
          key={movie.href}
          movie={movie}
          opinion={checked[movie.href]}
          setChecked={(href: string, opinion: Opinion) =>
            setChecked((checked) => ({
              ...checked,
              [href]: opinion,
            }))
          }
        />
      ))}
    </div>
  );
}

function Suggestion({
  opinion,
  setChecked,
  movie,
}: {
  movie: MovieWithRawInfo;
  opinion?: Opinion;
  setChecked: (href: string, opinion: Opinion | null) => void;
}) {
  return (
    <div>
      {movie.images ? (
        <Image
          src={movie.images[0]}
          height={100}
          width={100}
          alt={movie.name}
        />
      ) : null}
      <p>{movie.name}</p>
      <a target="_blank" href={`http://rottentomatoes.com${movie.href}`}>
        See more about movie
      </a>
      <button
        onClick={() => {
          const next = opinion === "like" ? null : "like";
          setChecked(movie.href, next);
        }}
        style={opinion === "like" ? { backgroundColor: "green" } : {}}
      >
        like
      </button>
      <button
        onClick={() => {
          const next = opinion === "dislike" ? null : "dislike";
          setChecked(movie.href, next);
        }}
        style={opinion === "dislike" ? { backgroundColor: "red" } : {}}
      >
        dislike
      </button>
    </div>
  );
}
