import type { AuthCredentials, SignupCredentials } from "@/domain/entities/AuthCredentials";
import type { AuthenticatedUser } from "@/domain/entities/User";
import type { CardState } from "@/presentation/screens/OtherServices/cards";
import type { DocumentData } from "firebase/firestore";
import type { AccessibilityRole, StyleProp, TextStyle, ViewStyle } from "react-native";
import type { SvgProps } from "react-native-svg";
import type { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import type { BalanceValue, TransactionType } from "../../shared/ProfileStyles/profile.styles.types";

export interface UserData {
  uuid: string; 
  name: string;
  email: string;
  photoURL?: string | null;
  createdAt?: unknown;
}

export interface IAnexo {
  name: string;
  url: string;
}

export interface DefaultButtonProps {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  onPress: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  indicatorColor?: string;
  accessibilityRole?: AccessibilityRole;
  accessibilityLabel: string;
  accessibilityHint?: string;
}

export interface AuthContextData {
  user: AuthenticatedUser | null; 
  userData: UserData | null;      
  isAuthenticated: boolean;
  loading: boolean;
  signup: {
    (credentials: SignupCredentials): Promise<void>;
    (email: string, password: string, name?: string): Promise<void>;
  };
  login: {
    (credentials: AuthCredentials): Promise<void>;
    (email: string, password: string): Promise<void>;
  };
  resetPassword: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export interface ScreenWrapperProps {
  children: React.ReactNode;
  showBalance?: boolean;
  showExtract?: boolean;
  extractTitle?: string;
  extractFilter?: (transaction: ITransaction) => boolean;
}

export interface ITransaction extends DocumentData {
  id?: string;
  description: string;
  valor: number;
  receiptUrl?: string;
  anexos:IAnexo[];
  tipo: string;
  userId: string;
  createdAt: string;
  updateAt: string;
}

export interface CheckboxProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  style?: ViewStyle;
  color?: string;
  accessibilityLabel?: string;
  accessibilityRole?: 'checkbox' | 'button' | 'switch';
  accessibilityHint?: string;
  accessibilityState?: {
    checked?: boolean;
    disabled?: boolean;
  };
}
export interface ITransactionsContextData {
  transactions: ITransaction[];
  balance:number;
  addTransaction: (transaction: INewTransactionInput) => Promise<void>;
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  loadMoreTransactions: () => Promise<void>;
  updateTransaction: (id: string, data: Partial<ITransaction>) => Promise<void>;
  uploadAttachmentAndUpdateTransaction: (transactionId: string, fileUri: string, fileName: string) => Promise<void>;
  deleteAttachment: (transactionId: string, attachmentToDelete: IAnexo) => Promise<void>;
  deleteTransactions: (ids: string[]) => Promise<void>;
}

export interface UseBalanceVisibilityProps {
  balance: BalanceValue;
}

export interface UseBalanceVisibilityReturn {
  showBalance: boolean;
  toggleBalance: () => void;
  displayValue: string;
  accessibilityLabel: string;
  accessibilityHint: string;
  buttonAccessibilityLabel: string;
}

export interface Transaction {
  tipo: "entrada" | "saida";
  valor: number;
}

export interface SavingsGoalProps {
  goal: number;
  transactions: Transaction[];
}

export interface INewTransactionInput {
  tipo: TransactionType;
  valor: number;
  description: string;
}
export interface SpendingAlertProps {
  limit: number;
  transactions: Transaction[];
}

export interface ErrorScreenProps {
  title?: string;
  message?: string;
  onRetry: () => void;
}

export interface CardMinhaContaStyles {
  title: TextStyle;
  field: ViewStyle;
  label: TextStyle;
  inputWrapper: ViewStyle;
  input: TextStyle;
  inputEditing: ViewStyle;
  icon: TextStyle;
}

export interface SvgMockProps extends ViewProps {
  accessible?: boolean;
  accessibilityLabel?: string;
  testID?: string;
}

export interface ScrollViewMockProps extends ViewProps {
  children?: React.ReactNode;
}

export interface DonutChartMockProps {
  accessibilityLabel: string;
  data: unknown[];
}

export interface CardPanelProps {
    title: string;
    state: CardState;
    onConfigure: () => void;
    onToggle: () => void;
    image: React.ComponentType<SvgProps>; 
    functionText: string;
    loading?: boolean;
  }
 export interface ToggleResponse {
  state: string;
}

export interface CadastroPageStyles {
  container: ViewStyle;
}