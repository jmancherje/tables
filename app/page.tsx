import { MovieTypeahead } from "@/components/movieTypeahead/MovieTypeahead";
import { Suggestions } from "@/components/suggestions/Suggestions";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AppProvider } from "@/components/appProvider/AppProvider";

export default function Home() {
  return (
    <AppProvider>
      <main>
        <Suggestions />
        {/* <MovieTypeahead /> */}
      </main>
    </AppProvider>
  );
}
