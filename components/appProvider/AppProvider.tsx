"use client";

import { RecoilRoot } from "recoil";

export function AppProvider({ children }: React.PropsWithChildren) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
