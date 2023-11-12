"use client";

import { useEffect, useRef, useState } from "react";
import IconButton from "@mui/material/IconButton";

import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import SearchIcon from "@mui/icons-material/Search";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Fab,
  Stack,
  Typography,
} from "@mui/material";
import { ProgressTab } from "../progress/ProgressTab";
import { useMovieState } from "@/lib/state/userOpinion";

async function getSuggestions(): Promise<{ suggestions: MovieWithRawInfo[] }> {
  const res = await fetch("/api/movieSuggestions");
  return await res.json();
}

export function Suggestions() {
  const [suggestions, setSuggestions] = useState<MovieWithRawInfo[]>([]);

  const fetched = useRef(false);
  useEffect(() => {
    if (fetched.current) {
      return;
    }
    fetched.current = true;
    async function fetchSuggestions() {
      const res = await getSuggestions();
      setSuggestions(res.suggestions);
    }

    fetchSuggestions();
  }, []);

  return (
    <Box sx={{ mt: "8vh" }}>
      <Stack direction="column">
        {suggestions.slice(0, 20).map((movie) => (
          <>
            <Suggestion key={movie.href} movie={movie} />
            <Divider />
          </>
        ))}
      </Stack>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: "20px", right: "20px" }}
      >
        <SearchIcon />
      </Fab>
      <ProgressTab />
    </Box>
  );
}

function Suggestion({ movie }: { movie: MovieWithRawInfo }) {
  const image = movie.thumbnail || movie.images[0];
  return (
    <Card sx={{ maxWidth: ["100%", "450px"], display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: 200 }}
        image={image}
        alt={movie.name}
      />
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {movie.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {movie.year}
          </Typography>
        </CardContent>
        <CardButtons href={movie.href} />
      </Box>
    </Card>
  );
}

function CardButtons({ href }: { href: string }) {
  const { liked, likeMovie, dislikeMovie } = useMovieState(href);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        pb: "16px",
      }}
    >
      <IconButton aria-label="like" onClick={likeMovie} color="success">
        {liked ? (
          <ThumbUpAltIcon sx={{ height: 38, width: 38 }} />
        ) : (
          <ThumbUpOffAltIcon sx={{ height: 38, width: 38 }} />
        )}
      </IconButton>
      <IconButton aria-label="like" onClick={dislikeMovie} color="error">
        {liked === false ? (
          <ThumbDownAltIcon sx={{ height: 38, width: 38 }} />
        ) : (
          <ThumbDownOffAltIcon sx={{ height: 38, width: 38 }} />
        )}
      </IconButton>
    </Box>
  );
}
