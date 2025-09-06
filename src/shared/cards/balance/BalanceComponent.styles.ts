import { tokens } from "@/src/theme/tokens";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

type BalanceComponentStyle = {
    container: ViewStyle,
    greetingSection: ViewStyle,
    nameTitle: TextStyle,
    dateText: TextStyle,
    balanceSection: ViewStyle,
    saldoHeader: ViewStyle,
    saldoTitleContainer: ViewStyle,
    saldoTitle: TextStyle,
    eyeIconContainer: ViewStyle,
    contaCorrenteTitle: TextStyle,
    valorSaldoText: TextStyle,
    pixelsImage1: ViewStyle,
    pixelsImage2: ViewStyle,
    whiteLine: ViewStyle
}

export const styles = StyleSheet.create<BalanceComponentStyle>({
    container: {
        backgroundColor: tokens.byteColorDash,
        borderRadius: tokens.radiusSm,
        paddingVertical: 44,
        width: '100%',
        minHeight: 600,
        overflow: 'hidden',
        flexDirection: 'column',
        paddingHorizontal: 66,
        gap: 40
    },
    greetingSection: {
        zIndex: 2,
    },
    nameTitle: {
        color: tokens.byteBgDefault,
        fontFamily: tokens.fontInter,
        fontWeight: tokens.fontSemibold,
        fontSize: tokens.textXl,
        textAlign: 'center',
        marginBottom: tokens.spacingLg,
    },
    dateText: {
        color: tokens.byteBgDefault,
        fontFamily: tokens.fontInter,
        fontSize: tokens.textXs,
        opacity: 0.9,
        textAlign: 'center',
    },
    balanceSection: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        zIndex: 2,
    },
    saldoHeader: {
        marginBottom: 16,
        width: '100%',
    },
    saldoTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    saldoTitle: {
        color: tokens.byteBgDefault,
        fontFamily: tokens.fontInter,
        fontWeight: tokens.fontSemibold,
        fontSize: tokens.textMd,
    },
    eyeIconContainer: {
        marginLeft: 12,
        padding: 4,
    },
    contaCorrenteTitle: {
        color: tokens.byteBgDefault,
        fontFamily: tokens.fontInter,
        fontSize: tokens.textSm,
        marginBottom: 8,
        opacity: 0.9,
    },
    valorSaldoText: {
        color: tokens.byteBgDefault,
        fontFamily: tokens.fontInter,
        fontSize: 28,
        fontWeight: tokens.fontSemibold,
        lineHeight: 32,
    },
    pixelsImage1: {
        position: 'absolute',
        top:0,
        left: 0,
        width: '90%',
        height: '100%',
        opacity: 0.8,
    },
    pixelsImage2: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '45%',
        height: '50%',
        opacity: 0.8,
    },
     whiteLine: {
        width: '100%',
        height: 2,
        backgroundColor: tokens.byteColorWhite,
    },
});
