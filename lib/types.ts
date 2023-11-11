declare interface Critic {
  name: string;
  href: string; // Unique
  movies: string[];
}

// Should be reference to BaseMovie and a score, but was built before
declare interface CriticMovie {
  name: string;
  href: string; // Unique
  year: string;
  score: string;
}

declare type RawMovieInfo = Record<string, string | Person[]>;

declare interface BaseMovie {
  name: string;
  href: string; // Unique
  year: string;
}

declare interface MovieWithRawInfo extends BaseMovie {
  rawMovieInfo: RawMovieInfo; // Can be used later
  images: string[];
  synopsis: string;
}

declare interface ParsedMovie extends MovieWithRawInfo {
  genres: Genre[];
  // TODO add other parsed fields
}

declare interface Genre {
  name: string; // Unique
}

// Director, producer, writer etc
declare interface Person {
  href: string; // Unique
  name: string;
}
