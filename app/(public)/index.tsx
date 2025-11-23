import LoadingFallback from "@presentation/components/common/LoadingFallback/LoadingFallback";
import { markEnd, markStart } from "@shared/utils/performance";
import React, { Suspense } from "react";

markStart("MainScreen.lazy");
const MainScreen = React.lazy(async () => {
  const mod = await import("@presentation/screens/Main/MainScreen");
  markEnd("MainScreen.lazy");
  return mod;
});

export default function MainScreenLazyWrapper(): React.ReactElement {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <MainScreen />
    </Suspense>
  );
}
