import { ErrorScreen } from "@presentation/components/common/common/ErrorScreen/ErrorScreen";
import { useRouter } from "expo-router";
import type { JSX } from "react";
import React from "react";

export default function NotFoundPage(): JSX.Element {
  const router = useRouter();

  const handleRetry = (): void => {
    router.replace("/(public)/login/LoginPage");
  };

  return (
    <ErrorScreen
      message="Página não encontrada."
      onRetry={handleRetry}
    />
  );
}
