import fs, { writeFile } from "fs/promises";
import path from "path";

type Frequency = [string, number];

export async function GET() {
  const rawFrequencies = await fs.readFile(
    path.resolve("./public", "data/frequencies.json")
  );
  const data = await fs.readFile(
    path.resolve("./public", "data/moviesByHref.json")
  );

  const moviesByHref = JSON.parse(data.toString());

  const frequencies: Frequency[] = JSON.parse(rawFrequencies.toString());
  const top100 = frequencies.slice(0, 1000);

  const weightedList = weightedIndexArray(top100, (frequency) => {
    return Math.ceil(frequency[1] * 0.25);
  });

  const selectionCount = 1000;
  const suggestions = [];

  let weightedIndices = [...weightedList];
  while (suggestions.length < selectionCount) {
    const weightIndex = randomIntFromInterval(0, weightedIndices.length - 1);
    const movieIndex = weightedIndices[weightIndex];
    const movieSelection = frequencies[movieIndex];
    suggestions.push(movieSelection);
    weightedIndices = weightedIndices.filter((idx) => idx !== movieIndex);
  }

  const movies = suggestions.map((suggestion) => moviesByHref[suggestion[0]]);

  return Response.json({ suggestions: movies });
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
