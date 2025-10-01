import { colors, sizes } from "@/src/theme";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { ListHeaderProps } from "../../ProfileStyles/profile.styles.types";
import { styles } from "./ListHeader.styles";
import { headerTexts } from "./ListHeader.texts";

export const ListHeader: React.FC<ListHeaderProps> = ({
  title,
  isEditing,
  isDeleting,
  onSave,
  onCancel,
  onEdit,
  onDelete,
}) => {
  if (!title) return null;

  const t = headerTexts.accessibility;

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>
      <View style={styles.iconsContainer}>
        {isEditing || isDeleting ? (
          <>
            <Pressable
              onPress={onSave}
              accessibilityRole="button"
              accessibilityLabel={t.save.label}
              accessibilityHint={t.save.hint}
            >
              <View style={isEditing ? styles.iconButton : styles.iconButtonDelete}>
                { isEditing && <Feather
                  name="check"
                  size={sizes.iconMd}
                  color={colors.byteColorWhite}
                  accessibilityElementsHidden={true}
                />
                }
                {
                  isDeleting && <Feather
                  name="trash-2"
                  size={sizes.iconMd}
                  color={colors.byteColorWhite}
                  accessibilityElementsHidden={true}
                />
                }
              </View>
            </Pressable>
            <Pressable
              onPress={onCancel}
              accessibilityRole="button"
              accessibilityLabel={t.cancel.label}
              accessibilityHint={t.cancel.hint}
            >
              <View style={styles.iconButton}>
                <Feather
                  name="x"
                  size={sizes.iconMd}
                  color={colors.byteColorWhite}
                  accessibilityElementsHidden={true}
                />
              </View>
            </Pressable>
          </>
        ) : (
          <>
            <Pressable
              onPress={onEdit}
              accessibilityRole="button"
              accessibilityLabel={t.edit.label}
              accessibilityHint={t.edit.hint}
            >
              <View style={styles.iconButton}>
                <Feather
                  name="edit-2"
                  size={sizes.iconMd}
                  color={colors.byteColorWhite}
                  accessibilityElementsHidden={true}
                />
              </View>
            </Pressable>
            <Pressable
              onPress={onDelete}
              accessibilityRole="button"
              accessibilityLabel={t.delete.label}
              accessibilityHint={t.delete.hint}
            >
              <View style={styles.iconButton}>
                <Feather
                  name="trash-2"
                  size={sizes.iconMd}
                  color={colors.byteColorWhite}
                  accessibilityElementsHidden={true}
                />
              </View>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
};
