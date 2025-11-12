import LoadingFallback from "@presentation/components/common/LoadingFallback/LoadingFallback";
import { markEnd, markStart } from "@shared/utils/performance";
import type { ReactElement } from "react";
import React, { Suspense } from "react";

markStart("CardsScreen.lazy");
const CardsScreen = React.lazy(async () => {
  const mod = await import("@presentation/screens/MyCards/CardsScreen");
  markEnd("CardsScreen.lazy");
  return mod;
});

export default function CardsLazyWrapper(): ReactElement {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CardsScreen />
    </Suspense>
  );
}
