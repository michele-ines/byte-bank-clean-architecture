import type { PreferencesStorage } from "@domain/storage/PreferencesStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { WidgetPreferences } from "@shared/ProfileStyles/profile.styles.types";

const PREFERENCES_STORAGE_KEY = "@WidgetPreferences";

export class AsyncStoragePreferences implements PreferencesStorage {
  async getPreferences(): Promise<WidgetPreferences> {
    const storedPrefs = await AsyncStorage.getItem(PREFERENCES_STORAGE_KEY);
    if (storedPrefs) {
      return JSON.parse(storedPrefs) as WidgetPreferences;
    }
    return { spendingAlert: true, savingsGoal: true };
  }

  async setPreferences(preferences: WidgetPreferences): Promise<void> {
    await AsyncStorage.setItem(
      PREFERENCES_STORAGE_KEY,
      JSON.stringify(preferences)
    );
  }
}
