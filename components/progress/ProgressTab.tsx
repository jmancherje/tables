"use client";

import { useRecoilValue } from "recoil";
import { Box, Divider, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

import { totalSelections } from "@/lib/state/userOpinion";

export function ProgressTab({ threshold = 15 }: { threshold?: number }) {
  const total = useRecoilValue(totalSelections);

  const percentage = Math.floor((total / threshold) * 100);
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
      <Typography variant="body1">{getText(percentage)}</Typography>
      <LinearProgress
        variant="determinate"
        color={getColor(percentage)}
        value={total >= threshold ? 100 : percentage}
      />
      <Divider />
    </Box>
  );
}

function getText(percentage: number) {
  if (percentage === 0) {
    return "Start rating movies";
  }

  if (percentage < 50) {
    return "Rate some more movies";
  }

  if (percentage < 80) {
    return "Good progress";
  }

  if (percentage < 100) {
    return "Just a few more";
  }

  return "Nice work";
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
