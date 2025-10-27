import type { CardPanelProps } from "@/shared/interfaces/auth.interfaces";
import CartaoDigitalImg from "@assets/images/dash-card-my-cards/cartao-digital.svg";
import CartaoFisicoImg from "@assets/images/dash-card-my-cards/cartao-fisico.svg";
import ConfirmModal from "@presentation/components/common/common/ConfirmModal/ConfirmModal";
import { DefaultButton } from "@presentation/components/common/common/DefaultButton/DefaultButton";
import type { CardState } from "@presentation/screens/OtherServices/cards";
import { apiToggleCardState } from "@presentation/screens/OtherServices/cards";
import { colors, layout, sizes, texts } from "@presentation/theme";
import * as Haptics from "expo-haptics";
import type { JSX } from "react";
import React, { useMemo, useState } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { styles } from "./PersonalCards.styles";

export default function PersonalCards(): JSX.Element {
  const { width } = useWindowDimensions();
  const isLg = width >= layout.breakpointLg;

  const [fisicoState, setFisicoState] = useState<CardState>("active");
  const [digitalState, setDigitalState] = useState<CardState>("active");
  const [loading, setLoading] = useState<{ fisico?: boolean; digital?: boolean }>({});
  const [modal, setModal] = useState<
    | { visible: true; kind: "fisico" | "digital"; willBlock: boolean }
    | { visible: false }
  >({ visible: false });


  const openConfirm = (kind: "fisico" | "digital"): void => {
    const current = kind === "fisico" ? fisicoState : digitalState;
    setModal({ visible: true, kind, willBlock: current === "active" });
  };

  const closeConfirm = (): void => setModal({ visible: false });


  const confirmToggle = async (): Promise<void> => {
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

  const CardPanel = ({
    title,
    state,
    onConfigure,
    onToggle,
    image: ImageCmp,
    functionText,
    loading,
  }: CardPanelProps): JSX.Element => {
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
            <DefaultButton
              title={btnToggleTitle}
              onPress={onToggle}
              loading={!!loading}
              disabled={!!loading}
              buttonStyle={[
                styles.btn,
                btnToggleStyle,
                loading && styles.disabled,
              ]}
              textStyle={[styles.btnTextBase, btnToggleTextStyle]}
              indicatorColor={colors.byteColorDash}
              accessibilityLabel={`${btnToggleTitle} ${title}`}
            />

            <Text style={styles.functionText}>{functionText}</Text>
          </View>
        </View>
      </>
    );
  };

  /* ---------------------------------------------------------------------- */
  /* 🧠 Memos para título e mensagem do modal                                */
  /* ---------------------------------------------------------------------- */
  const modalTitle = useMemo((): string => {
    if (!modal.visible) return "";
    return modal.willBlock
      ? texts.textBloquearCartao
      : texts.textDesbloquearCartao;
  }, [modal]);

  const modalMessage = useMemo((): string => {
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
          onConfigure={() => undefined}
          onToggle={() => openConfirm("fisico")}
          loading={loading.fisico}
        />

        <CardPanel
          title={texts.textCartaoDigital}
          state={digitalState}
          image={CartaoDigitalImg}
          functionText={texts.textFuncaoDigital}
          onConfigure={() => undefined}
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
        loading={modal.visible ? loading[modal.kind] ?? false : false}
        onCancel={closeConfirm}
        /* ✅ encapsula Promise-returning em void */
        onConfirm={() => {
          void confirmToggle();
        }}
      />
    </View>
  );
}
