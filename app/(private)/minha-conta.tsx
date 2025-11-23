import LoadingFallback from "@presentation/components/common/LoadingFallback/LoadingFallback";
import { markEnd, markStart } from "@shared/utils/performance";
import type { ReactElement } from "react";
import React, { Suspense } from "react";

markStart("MinhaContaScreen.lazy");
const MinhaContaScreen = React.lazy(async () => {
  const mod = await import("@presentation/screens/MinhaConta/MinhaContaScreen");
  markEnd("MinhaContaScreen.lazy");
  return mod;
});

export default function MinhaContaLazyWrapper(): ReactElement {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <MinhaContaScreen />
    </Suspense>
  );
}
