import LoadingFallback from "@presentation/components/common/LoadingFallback/LoadingFallback";
import { markEnd, markStart } from "@shared/utils/performance";
import type { ReactElement } from "react";
import React, { Suspense } from "react";

markStart("DashboardScreen.lazy");
const DashboardScreen = React.lazy(async () => {
  const mod = await import("@presentation/screens/Dashboard/DashboardScreen");
  markEnd("DashboardScreen.lazy");
  return mod;
});

export default function DashboardLazyWrapper(): ReactElement {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <DashboardScreen />
    </Suspense>
  );
}
