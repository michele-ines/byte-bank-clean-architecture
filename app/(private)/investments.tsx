import LoadingFallback from "@presentation/components/common/LoadingFallback/LoadingFallback";
import { markEnd, markStart } from "@shared/utils/performance";
import type { ReactElement } from "react";
import React, { Suspense } from "react";

markStart("InvestmentsScreen.lazy");
const InvestmentsScreen = React.lazy(async () => {
  const mod = await import(
    "@presentation/screens/Investments/InvestmentsScreen"
  );
  markEnd("InvestmentsScreen.lazy");
  return mod;
});

export default function InvestmentsLazyWrapper(): ReactElement {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <InvestmentsScreen />
    </Suspense>
  );
}
