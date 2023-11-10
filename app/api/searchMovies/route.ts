import fs from "fs/promises";

export async function GET(request: Request) {
  const rawSortedNames = await fs.readFile(
    "./public/data/sortedMovieNames.json"
  );
  const rawMoviesByHref = await fs.readFile("./public/data/moviesByHref.json");

  const { searchParams } = new URL(request.url);
  console.log(searchParams, request.url);
  const search = searchParams.get("search");
  if (!search || search.length < 3) {
    return Response.json({ data: [] });
  }
  const moviesByHref = JSON.parse(rawMoviesByHref.toString());
  const sortedNames = JSON.parse(rawSortedNames.toString());
  const regex = new RegExp(search, "i");
  const filtered = sortedNames.filter((movie: [string, string]) =>
    regex.test(movie[0])
  );
  const movies = filtered.map(
    (movie: [string, string]) => moviesByHref[movie[1]]
  ) as MovieWithRawInfo[];
  return Response.json({ data: movies.map((movie) => movie) });
}
