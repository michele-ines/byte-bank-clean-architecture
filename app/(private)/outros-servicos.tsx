import LoadingFallback from "@presentation/components/common/LoadingFallback/LoadingFallback";
import { markEnd, markStart } from "@shared/utils/performance";
import type { ReactElement } from "react";
import React, { Suspense } from "react";

markStart("ServicesScreen.lazy");
const ServicesScreen = React.lazy(async () => {
  const mod = await import(
    "@presentation/screens/OtherServices/OtherServicesScreen"
  );
  markEnd("ServicesScreen.lazy");
  return mod;
});

export default function ServicesLazyWrapper(): ReactElement {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ServicesScreen />
    </Suspense>
  );
}
