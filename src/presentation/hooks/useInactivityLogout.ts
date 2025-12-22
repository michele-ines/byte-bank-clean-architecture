import { useCallback, useEffect, useRef } from "react";

import type { AuthenticatedUser } from "@domain/entities/User";
import { Alert, AppState, type AppStateStatus } from "react-native";

interface UseInactivityLogoutProps {
  user: AuthenticatedUser | null;
  onSignOut: () => Promise<void>;
}

const INACTIVITY_TIMEOUT = 2 * 60 * 1000;

export const useInactivityLogout = ({
  user,
  onSignOut,
}: UseInactivityLogoutProps): void => {
  const lastActivityRef = useRef<number>(Date.now());

  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const updateLastActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
  }, []);

  const checkInactivity = useCallback(() => {
    const now = Date.now();
    if (now - lastActivityRef.current > INACTIVITY_TIMEOUT && user) {
      Alert.alert(
        "Sessão expirada",
        "Faça login novamente para continuar.",
        [
          {
            text: "OK",
            onPress: () => {
              void onSignOut();
            },
          },
        ],
        { cancelable: false }
      );
    }
  }, [user, onSignOut]);

  const startInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearInterval(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = setInterval(checkInactivity, 60000);
  }, [checkInactivity]);

  const stopInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearInterval(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (user) {
      startInactivityTimer();
    } else {
      stopInactivityTimer();
    }

    return () => {
      stopInactivityTimer();
    };
  }, [user, startInactivityTimer, stopInactivityTimer]);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus): void => {
      if (nextAppState === "active") {
        updateLastActivity();
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, [updateLastActivity]);

  useEffect(() => {
    updateLastActivity();
  }, [user, updateLastActivity]);
};
