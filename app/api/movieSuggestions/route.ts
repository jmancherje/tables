import { getSuggestions } from "./getSuggestions";

export async function GET() {
  const movies = await getSuggestions();

  return Response.json({ suggestions: movies });
}
