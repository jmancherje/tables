import { logProgress } from "@/lib/utils/logProgress";
import { isNotAuthorized, scrapePage } from "@/lib/utils/scrapePage";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  const rawMoviesByHref = await fs.readFile(
    path.resolve("./public", "data/moviesByHref.json")
  );
  const moviesByHref = JSON.parse(rawMoviesByHref.toString());

  const rawMoviesByHrefWithThumbnails = await fs.readFile(
    path.resolve("./public", "data/moviesByHrefWithThumbnail.json")
  );
  const moviesByHrefWithThumbnail = JSON.parse(
    rawMoviesByHrefWithThumbnails.toString()
  );

  const allHrefs = Object.keys(moviesByHref);
  const hrefs = allHrefs.filter((href) => !(href in moviesByHrefWithThumbnail));

  const start = new Date();
  for (let i = 0; i < hrefs.length; i++) {
    if ((i + 1) % 10 === 0) {
      // Every 10 processed pages
      // - log process
      // - write to local file
      console.log(
        `processed ${i + 1} thumbnails, ${
          hrefs.length - i + 1
        } remaining. Writing progress to disk.`
      );
      logProgress({
        start,
        index: i,
        totalCount: hrefs.length,
      });

      await fs.writeFile(
        path.resolve("./public", "data/moviesByHrefWithThumbnail.json"),
        JSON.stringify(moviesByHrefWithThumbnail)
      );
    }

    const href = hrefs[i];

    // 1. scrape the page
    const fullHref = `https://www.rottentomatoes.com${href}`;
    const dom = await scrapePage(fullHref);
    const accessDenied = isNotAuthorized(dom);
    if (accessDenied) {
      console.log("denied after", i + 1, "movies");
      throw new Error("Access Denied");
    }

    // 2. get the thumbnail url
    const thumbnailNode = dom.window.document.querySelector(".thumbnail img");
    const thumbnail: string | null = thumbnailNode?.getAttribute("src") || null;

    // 3. get copy of this movie, attach thumbnail, and add it to new moviesByHref
    const movie = moviesByHref[href];
    movie.thumbnail = thumbnail;
    moviesByHrefWithThumbnail[href] = movie;
  }

  // Final write to get all the movies
  await fs.writeFile(
    path.resolve("./public", "data/moviesByHrefWithThumbnail.json"),
    JSON.stringify(moviesByHrefWithThumbnail)
  );

  return Response.json({ success: true });
}
