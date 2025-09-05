import PixelImage from '@/assets/images/dash-card-saldo/card-pixels-1.svg';
import PixelImage2 from '@/assets/images/dash-card-saldo/card-pixels-2.svg';
import { Entypo } from "@expo/vector-icons";
import { UserInfo } from "firebase/auth";
import { useMemo } from "react";
import { Pressable, Text, View } from "react-native";

import { useBalanceVisibility } from '@/src/hooks/useBalanceVisibility';
import { tokens } from '@/src/theme/tokens';
import { getCurrentDate } from '@/src/utils/date';
import { getFirstName } from '@/src/utils/string';
import { styles } from "./BalanceComponent.styles";

type AccountType = "corrente" | "poupança" | string;

type BalanceComponentProps = {
    balance: { account: AccountType; value: number | null };
    user: UserInfo
}

export default function Balance({ balance, user }: BalanceComponentProps) {
    const balanceVisibility = useBalanceVisibility({ balance: balance.value });
    
    // Calcula a data apenas uma vez no render para evitar inconsistências
    const currentDate = useMemo(() => getCurrentDate(), []);
    
    const firstName = getFirstName(user?.displayName || "");


    return (
        <View 
            style={styles.container}
            accessibilityLabel={`Cartão de saldo de ${firstName || "usuário"}`}
        >
            <PixelImage style={styles.pixelsImage1}/>
            <PixelImage2 style={styles.pixelsImage2}/>
            <View style={styles.greetingSection}>
                <Text 
                    style={styles.nameTitle}
                    accessibilityRole="header"
                >
                    Olá, {firstName}! :)
                </Text>
                <Text 
                    style={styles.dateText}
                    accessibilityLabel={`Data de hoje: ${currentDate}`}
                >
                    {currentDate}
                </Text>
            </View>

            {/* Seção de saldo - posicionada à direita */}
            <View 
                style={styles.balanceSection}
                accessibilityLabel="Informações de saldo da conta"
            >
                <View style={styles.saldoHeader}>
                    <View style={styles.saldoTitleContainer}>
                        <Text 
                            style={styles.saldoTitle}
                            accessibilityRole="header"
                        >
                            Saldo
                        </Text>
                        <Pressable 
                            accessibilityRole="button" 
                            accessibilityLabel={balanceVisibility.buttonAccessibilityLabel}
                            accessibilityHint={balanceVisibility.accessibilityHint}
                            onPress={balanceVisibility.toggleBalance}
                            style={styles.eyeIconContainer}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <Entypo 
                                name={balanceVisibility.showBalance ? "eye" : "eye-with-line"} 
                                size={tokens.textSm} 
                                color={tokens.byteColorWhite}
                                accessible={false}
                            />
                        </Pressable>
                    </View>
                    <View 
                        style={styles.whiteLine} 
                        accessible={false}
                        importantForAccessibility="no"
                    />
                </View>

                <Text 
                    style={styles.contaCorrenteTitle}
                    accessibilityLabel={`Tipo de conta: ${balance.account}`}
                >
                   Conta {balance.account}
                </Text>
                <Text 
                    style={styles.valorSaldoText}
                    accessibilityLabel={balanceVisibility.accessibilityLabel}
                    accessibilityLiveRegion="polite"
                >
                    {balanceVisibility.displayValue}
                </Text>
            </View>
        </View>
    );
}
