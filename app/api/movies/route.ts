import fs from "fs/promises";
import path from "path";

export async function GET() {
  const data = await fs.readFile(
    path.resolve("./public", "data/moviesByHref.json")
  );

  const moviesByHref = JSON.parse(data.toString());
  const hrefs = Object.keys(moviesByHref);

  const names = hrefs.map((href) => {
    const movie = moviesByHref[href];
    return [movie.name, href];
  });

  fs.writeFile(
    path.resolve("./public", "data/sortedMovieNames.json"),
    JSON.stringify(names)
  );

  return Response.json({ data: hrefs.length });
}
