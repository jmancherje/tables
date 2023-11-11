import { MovieTypeahead } from "@/components/movieTypeahead/MovieTypeahead";
import { Suggestions } from "@/components/suggestions/Suggestions";

export default function Home() {
  return (
    <main
      style={{
        padding: "20px",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Suggestions />
      {/* <MovieTypeahead /> */}
    </main>
  );
}
