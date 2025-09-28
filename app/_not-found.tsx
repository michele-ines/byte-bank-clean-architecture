import { ErrorScreen } from "@/src/components/common/ErrorScreen/ErrorScreen";
import { useRouter } from "expo-router";
import React from "react";

export default function NotFoundPage() {
  const router = useRouter();

  const handleRetry = () => {
    // Exemplo: voltar para a Home ou Login
    router.replace("/(public)/login/login");
  };

  return (
    <ErrorScreen 
      message="Página não encontrada."
      onRetry={handleRetry}
    />
  );
}
