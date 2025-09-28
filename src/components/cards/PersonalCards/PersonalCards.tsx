import ConfirmModal from "@/src/components/common/ConfirmModal/ConfirmModal";
import { apiToggleCardState, CardState } from "@/src/OtherServices/cards";
import * as Haptics from "expo-haptics";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import CartaoDigitalImg from "@/assets/images/dash-card-my-cards/cartao-digital.svg";
import CartaoFisicoImg from "@/assets/images/dash-card-my-cards/cartao-fisico.svg";
import { colors } from "@/src/theme/colors";
import { layout } from "@/src/theme/layout";
import { sizes } from "@/src/theme/sizes";
import { texts } from "@/src/theme/texts";
import { styles } from "./PersonalCards.styles";

export default function PersonalCards() {
  const { width } = useWindowDimensions();
  const isLg = width >= layout.breakpointLg;

  const [fisicoState, setFisicoState] = useState<CardState>("active");
  const [digitalState, setDigitalState] = useState<CardState>("active");
  const [loading, setLoading] = useState<{
    fisico?: boolean;
    digital?: boolean;
  }>({});
  const [modal, setModal] = useState<
    | { visible: true; kind: "fisico" | "digital"; willBlock: boolean }
    | { visible: false }
  >({ visible: false });

  const openConfirm = (kind: "fisico" | "digital") => {
    const current = kind === "fisico" ? fisicoState : digitalState;
    setModal({ visible: true, kind, willBlock: current === "active" });
  };

  const closeConfirm = () => setModal({ visible: false });

  const confirmToggle = async () => {
    if (!modal.visible) return;
    const kind = modal.kind;
    const current = kind === "fisico" ? fisicoState : digitalState;

    try {
      setLoading((s) => ({ ...s, [kind]: true }));
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      const res = await apiToggleCardState(kind, current);
      if (kind === "fisico") setFisicoState(res.state);
      else setDigitalState(res.state);

      await Haptics.notificationAsync(
        res.state === "blocked"
          ? Haptics.NotificationFeedbackType.Error
          : Haptics.NotificationFeedbackType.Success
      );
    } catch (e) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      console.warn(String(e));
    } finally {
      setLoading((s) => ({ ...s, [kind]: false }));
      closeConfirm();
    }
  };

  type CardPanelProps = {
    title: string;
    state: CardState;
    onConfigure: () => void;
    onToggle: () => void;
    image: React.ComponentType<any>;
    functionText: string;
    loading?: boolean;
  };

  const CardPanel = ({
    title,
    state,
    onConfigure,
    onToggle,
    image: ImageCmp,
    functionText,
    loading,
  }: CardPanelProps) => {
    const btnToggleTitle =
      state === "active" ? texts.textBloquear : texts.textDesbloquear;

    const btnToggleStyle =
      state === "active" ? styles.btnOutlinedDanger : styles.btnOutlinedNeutral;
    const btnToggleTextStyle =
      state === "active"
        ? styles.btnOutlinedDangerText
        : styles.btnOutlinedNeutralText;

    const badgeStyle =
      state === "active" ? styles.badgeActive : styles.badgeBlocked;
    const badgeTextStyle =
      state === "active" ? styles.badgeTextActive : styles.badgeTextBlocked;

    return (
      <>
        <Text style={styles.sectionHeading} accessibilityRole="header">
          {title}
        </Text>

        <View
          style={[styles.panel, isLg ? styles.row : styles.column]}
          accessibilityRole="summary"
          accessibilityLabel={title}
        >
          <View style={styles.cardCol}>
            <ImageCmp
              width={sizes.cardImageWidth}
              height={sizes.cardImageHeight}
              accessibilityLabel={title}
              style={!isLg ? styles.cardImageSmall : undefined}
            />
            <View style={[styles.badge, badgeStyle]}>
              <Text style={[styles.badgeText, badgeTextStyle]}>
                {state === "active" ? texts.textAtivo : texts.textBloqueado}
              </Text>
            </View>
          </View>

          <View style={styles.actions}>
            {/* Botão configurar */}
            <Pressable
              onPress={onConfigure}
              accessibilityRole="button"
              accessibilityLabel={`${texts.a11yConfigurar} ${title}`}
              style={({ pressed }) => [
                styles.btn,
                styles.btnPrimary,
                pressed && styles.pressed,
              ]}
            >
              <Text style={[styles.btnTextBase, styles.btnPrimaryText]}>
                {texts.textConfigurar}
              </Text>
            </Pressable>

            {/* Botão bloquear/desbloquear */}
            <Pressable
              onPress={onToggle}
              accessibilityRole="button"
              accessibilityLabel={`${btnToggleTitle} ${title}`}
              disabled={!!loading}
              style={({ pressed }) => [
                styles.btn,
                btnToggleStyle,
                pressed && styles.pressed,
                loading && styles.disabled,
              ]}
            >
              {loading ? (
                <ActivityIndicator color={colors.byteColorDash} />
              ) : (
                <Text style={[styles.btnTextBase, btnToggleTextStyle]}>
                  {btnToggleTitle}
                </Text>
              )}
            </Pressable>

            <Text style={styles.functionText}>{functionText}</Text>
          </View>
        </View>
      </>
    );
  };

  const modalTitle = useMemo(() => {
    if (!modal.visible) return "";
    return modal.willBlock
      ? texts.textBloquearCartao
      : texts.textDesbloquearCartao;
  }, [modal]);

  const modalMessage = useMemo(() => {
    if (!modal.visible) return "";
    return modal.willBlock ? texts.textMsgBloqueio : texts.textMsgDesbloqueio;
  }, [modal]);

  return (
    <View
      accessible
      accessibilityRole="summary"
      accessibilityLabel={texts.a11yMeusCartoes}
      style={styles.wrapper}
    >
      <View style={styles.list}>
        <CardPanel
          title={texts.textCartaoFisico}
          state={fisicoState}
          image={CartaoFisicoImg}
          functionText={texts.textFuncaoFisico}
          onConfigure={() => {}}
          onToggle={() => openConfirm("fisico")}
          loading={loading.fisico}
        />

        <CardPanel
          title={texts.textCartaoDigital}
          state={digitalState}
          image={CartaoDigitalImg}
          functionText={texts.textFuncaoDigital}
          onConfigure={() => {}}
          onToggle={() => openConfirm("digital")}
          loading={loading.digital}
        />
      </View>

      <ConfirmModal
        visible={modal.visible}
        title={modalTitle}
        message={modalMessage}
        confirmText={
          modal.visible && modal.willBlock
            ? texts.textBloquear
            : texts.textDesbloquear
        }
        isDestructive={modal.visible && modal.willBlock}
        loading={(modal.visible && loading[modal.kind]) || false}
        onCancel={closeConfirm}
        onConfirm={confirmToggle}
      />
    </View>
  );
}
