import { ErrorScreen } from "@presentation/components/common/common/ErrorScreen/ErrorScreen";
import { useRouter } from "expo-router";
import React from "react";

export default function NotFoundPage() {
  const router = useRouter();

  const handleRetry = () => {
    router.replace("/(public)/login/LoginPage");
  };

  return (
    <ErrorScreen 
      message="Página não encontrada."
      onRetry={handleRetry}
    />
  );
}
