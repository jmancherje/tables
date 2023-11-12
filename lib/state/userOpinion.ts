import { useMemo } from "react";
import { atom, selector, useRecoilState } from "recoil";

export const userChoicesAtom = atom<Map<string, boolean>>({
  key: "userChoicesAtom",
  default: new Map(),
});

export const totalSelections = selector<number>({
  key: "totalSelectionsSelector",
  get({ get }) {
    const choices = get(userChoicesAtom);
    return choices.size;
  },
});

export function useMovieState(href: string): {
  likeMovie: () => void;
  dislikeMovie: () => void;
  liked: boolean | undefined;
} {
  const [choices, setChoices] = useRecoilState(userChoicesAtom);

  const liked = choices.get(href);

  return useMemo(
    () => ({
      liked,
      likeMovie() {
        setChoices((previousChoices) => {
          const nextChoices = new Map(previousChoices);
          if (liked === undefined || liked === false) {
            nextChoices.set(href, true);
          } else {
            nextChoices.delete(href);
          }
          return nextChoices;
        });
      },
      dislikeMovie() {
        setChoices((previousChoices) => {
          const nextChoices = new Map(previousChoices);
          if (liked === undefined || liked === true) {
            nextChoices.set(href, false);
          } else {
            nextChoices.delete(href);
          }
          return nextChoices;
        });
      },
    }),
    [href, liked, setChoices]
  );
}
