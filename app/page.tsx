import { Suggestions } from "@/components/suggestions/Suggestions";
import { AppProvider } from "@/components/appProvider/AppProvider";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { getSuggestions } from "./api/movieSuggestions/getSuggestions";

export default async function Home() {
  const suggestions = await getSuggestions();

  return (
    <AppProvider>
      <main>
        <Suggestions suggestions={suggestions} />
      </main>
    </AppProvider>
  );
}
