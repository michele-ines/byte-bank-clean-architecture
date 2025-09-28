import { INewTransactionInput } from "@/src/contexts/TransactionsContext";
import { User, UserCredential } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import { BalanceValue } from "../ProfileStyles/profile.styles.types";

export interface UserData {
  uuid: string; 
  name: string;
  email: string;
  photoURL?: string | null;
  createdAt?: any;
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
  anexos: Array<any>;
  tipo: string;
  userId: string;
  createdAt: string;
  updateAt: string;
}

export interface ITransactionsContextData {
  transactions: ITransaction[];
  addTransaction: (transaction: INewTransactionInput) => Promise<void>;
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  loadMoreTransactions: () => Promise<void>;
  updateTransaction: (id: string, data: Partial<ITransaction>) => Promise<void>;
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

export interface SpendingAlertProps {
  limit: number;
  transactions: Transaction[];
}