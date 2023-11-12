"use client";

import { useRecoilValue } from "recoil";
import { Box, Divider, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

import { totalSelections } from "@/lib/state/userOpinion";

export function ProgressTab({ threshold = 5 }: { threshold?: number }) {
  const total = useRecoilValue(totalSelections);

  const value = Math.floor((total / threshold) * 100);
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        p: "10px",
        height: "8vh",
        backgroundColor: "white",
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
      }}
    >
      <Typography variant="body1">Rate more movies</Typography>
      <LinearProgress
        variant="determinate"
        color={getColor(value)}
        value={Math.floor((total / threshold) * 100)}
      />
      <Divider />
    </Box>
  );
}

function getColor(
  value: number
): React.ComponentProps<typeof LinearProgress>["color"] {
  if (value < 10) {
    return "warning";
  } else if (value < 50) {
    return "info";
  }
  return "success";
}
