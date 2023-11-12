"use client";

import { CSSProperties } from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import IconButton from "@mui/material/IconButton";

import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { ProgressTab } from "../progress/ProgressTab";
import { useMovieState } from "@/lib/state/userOpinion";
import { useIsSsr } from "@/lib/utils/useIsSsr";

export function Suggestions({
  suggestions,
}: {
  suggestions: MovieWithRawInfo[];
}) {
  const innerHeight = useInnerHeight();
  return (
    <Box sx={{ mt: "8vh" }}>
      <Stack direction="column">
        <FixedSizeList<MovieWithRawInfo[]>
          itemData={suggestions}
          height={innerHeight}
          width="100%"
          itemSize={296}
          itemCount={250}
          overscanCount={5}
        >
          {renderRow}
        </FixedSizeList>
      </Stack>
      <ProgressTab />
    </Box>
  );
}

function useInnerHeight(fallback: number = 1000): number {
  const { isServer } = useIsSsr();
  if (isServer) {
    return fallback;
  }
  return window.innerHeight;
}

function renderRow(props: ListChildComponentProps<MovieWithRawInfo[]>) {
  const movie = props.data[props.index];
  const style = props.style;
  return <Suggestion movie={movie} style={style} />;
}

function Suggestion({
  movie,
  style,
}: {
  movie: MovieWithRawInfo;
  style: CSSProperties;
}) {
  const image = movie.thumbnail || movie.images[0];
  const { liked } = useMovieState(movie.href);
  return (
    <Card
      sx={{
        maxWidth: ["100%", "450px"],
        display: "flex",
        height: 296,
        position: "relative",
        borderRadius: 0,
        borderBottom: "0.5px solid",
        borderBottomColor: "#a4a4a4",
        ...style,
      }}
    >
      {typeof liked === "boolean" && <SuggestionOverlay liked={liked} />}
      <CardMedia
        component="img"
        sx={{ width: 201 }}
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

function SuggestionOverlay({ liked }: { liked: boolean }) {
  return (
    <Box
      style={{
        pointerEvents: "none",
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: liked ? "green" : "red",
        opacity: 0.2,
      }}
    />
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
