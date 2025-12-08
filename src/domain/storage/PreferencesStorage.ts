import type { WidgetPreferences } from "@/shared/ProfileStyles/profile.styles.types";

export interface PreferencesStorage {
  getPreferences(): Promise<WidgetPreferences>;
  setPreferences(preferences: WidgetPreferences): Promise<void>;
}
