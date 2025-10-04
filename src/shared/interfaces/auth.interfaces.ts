import { User, UserCredential } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import { AccessibilityRole, StyleProp, TextStyle, ViewStyle } from "react-native";
import { BalanceValue, TransactionType } from "../ProfileStyles/profile.styles.types";

export interface UserData {
  uuid: string; 
  name: string;
  email: string;
  photoURL?: string | null;
  createdAt?: any;
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
  user: User | null;
  userData: UserData | null;
  isAuthenticated: boolean;
  loading: boolean;
  signup: (email: string, password: string, name: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  resetPassword: (email: string) => Promise<void>;
  signOut: () => void;
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
  anexos: Array<string>;
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
  // Parâmetros opcionais de acessibilidade
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
  deleteAttachment: (transactionId: string, fileUrl: string) => Promise<void>;
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
