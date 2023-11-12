import fs from "fs/promises";
import path from "path";

type Frequency = [string, number];

export async function getSuggestions(): Promise<MovieWithRawInfo[]> {
  const rawFrequencies = await fs.readFile(
    path.resolve("./public", "data/frequencies.json")
  );
  const rawMovies = await fs.readFile(
    path.resolve("./public", "data/moviesByHref.json")
  );
  const rawMoviesWithThumbnails = await fs.readFile(
    path.resolve("./public", "data/moviesByHrefWithThumbnail.json")
  );

  const moviesByHref = JSON.parse(rawMovies.toString());
  const moviesByHrefWithThumbnail = JSON.parse(
    rawMoviesWithThumbnails.toString()
  );

  const frequencies: Frequency[] = JSON.parse(rawFrequencies.toString());
  const topMovies = frequencies.slice(0, 250);

  const weightedList = weightedIndexArray(topMovies, (frequency) => {
    return Math.ceil(frequency[1] * 0.25);
  });

  const selectionCount = 250;
  const suggestions = [];

  let weightedIndices = [...weightedList];
  while (suggestions.length < selectionCount) {
    const weightIndex = randomIntFromInterval(0, weightedIndices.length - 1);
    const movieIndex = weightedIndices[weightIndex];
    const movieSelection = frequencies[movieIndex];
    suggestions.push(movieSelection);
    weightedIndices = weightedIndices.filter((idx) => idx !== movieIndex);
  }

  const movies: MovieWithRawInfo[] = suggestions.map((suggestion) => {
    const movieWithThumbnail = moviesByHrefWithThumbnail[suggestion[0]];
    const movieWithout = moviesByHref[suggestion[0]];
    if (!movieWithThumbnail) {
      return {
        ...movieWithout,
        thumbnail: null,
      };
    }
    return movieWithThumbnail;
  });

  return movies;
}

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function weightedIndexArray<T>(input: T[], weightResolver: (val: T) => number) {
  let output: number[] = [];

  input.forEach((val, index) => {
    const weight = weightResolver(val);
    const items = new Array(weight).fill(index);
    output = output.concat(items);
  });

  return output;
}
