import type { ILoggerService } from "@/shared/interfaces/log.Interfaces";
import type { UserInfo } from "firebase/auth";
import type { ReactNode } from "react";
import type { StyleProp, TextStyle, ViewStyle } from "react-native";
import type { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import type { ITransaction } from "../interfaces/auth.interfaces";

export interface CreateTransaction {
  exec: (tx: Transaction) => Promise<void>;
}

export interface ListUserTransactions {
  exec: (userId: string) => () => void;
}

export interface ProfileStyles {
  container: ViewStyle;
  header: ViewStyle;
  avatarCircle: ViewStyle;
  avatarText: TextStyle;
  userName: TextStyle;
  userEmail: TextStyle;
  scrollContent: ViewStyle;
  logoutButton: ViewStyle;
  logoutButtonText: TextStyle;
}

export interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface DashboardStyles {
  container: ViewStyle;
  content: ViewStyle;
  headerTitle: TextStyle;
  totalValue: TextStyle;
  summaryContainer: ViewStyle;
  summaryCard: ViewStyle;
  summaryCardTitle: TextStyle;
  summaryCardValue: TextStyle;
  statsTitle: TextStyle;
  statsCard: ViewStyle;
  chartContainer: ViewStyle;
  legendContainer: ViewStyle;
  legendItem: ViewStyle;
  legendDot: ViewStyle;
  legendText: TextStyle;
  cardPixelsTop: ViewStyle;
  cardPixelsBotton: ViewStyle;
}

export interface AppLayoutStyles {
  loaderContainer: ViewStyle;
  drawerStyle: ViewStyle;
  drawerLabel: TextStyle;
  drawerItem: ViewStyle;
}

export interface ChartStyles {
  chartContainer: ViewStyle;
}

export interface TransactionsStyles {
  container: ViewStyle;
  title: TextStyle;
  input: TextStyle;
  card: ViewStyle;
  row: ViewStyle;
  description: TextStyle;
  amount: TextStyle;
  date: TextStyle;
  empty: TextStyle;
  receiptButton: ViewStyle;
  receiptButtonText: TextStyle;
  loadingFooter: ViewStyle;
  loadingText: TextStyle;
  attachmentsTitle: TextStyle;
  attachmentsContainer: ViewStyle;
  attachmentLink: TextStyle;
  editActionsContainer: ViewStyle;
  deleteButton: ViewStyle;
  deleteButtonText: TextStyle;
  attachmentRow: ViewStyle;
  separator: ViewStyle;
  amountNegative: TextStyle;
}

export interface EditFieldModalStyles {
  field: ViewStyle;
  label: TextStyle;
  input: TextStyle;
  inputEditing: ViewStyle;
  modalOverlay: ViewStyle;
  modalContent: ViewStyle;
  modalTitle: TextStyle;
  modalActions: ViewStyle;
  cancelButton: ViewStyle;
  cancelButtonText: TextStyle;
  modalInput: TextStyle;
  showPasswordBtn: ViewStyle;
  saveButton: ViewStyle;
  saveButtonText: TextStyle;
  inputWrapper: ViewStyle;
  errorText: TextStyle;
}

export interface HeaderStyles {
  container: ViewStyle;
  row: ViewStyle;
  centerLogo: ViewStyle;
}

export interface DashboardExtraStyles {
  wrapper: ViewStyle;
  row: ViewStyle;
  card: ViewStyle;
  cardTitle: TextStyle;
  cardValue: TextStyle;
  balance: ViewStyle;
  balanceLabel: TextStyle;
  balanceValue: TextStyle;
}

export interface NewTransactionFormStyle {
  safeArea: ViewStyle;
  container: ViewStyle;
  keyboardAvoiding: ViewStyle;
  scrollContentContainer: ViewStyle;
  title: TextStyle;
  pickerContainer: ViewStyle;
  label: TextStyle;
  input: TextStyle;
  submitButton: ViewStyle;
  submitButtonText: TextStyle;
  cardPixelsTop: ViewStyle;
  cardPixelsBotton: ViewStyle;
  illustration: ViewStyle;
  bottomIllustrationsContainer: ViewStyle;
  dropdownPicker: ViewStyle;
}

export interface WidgetPreferences {
  spendingAlert: boolean;
  savingsGoal: boolean;
}

export interface InvestmentsScreenStyles {
  container: ViewStyle;
  title: TextStyle;
}

export interface WidgetPreferencesContextType {
  preferences: WidgetPreferences;
  updatePreferences: (newPrefs: WidgetPreferences) => void;
}

export interface ForgotPasswordFormStyles {
  card: ViewStyle;
  title: TextStyle;
  label: TextStyle;
  input: TextStyle;
  submit: ViewStyle;
  submitText: TextStyle;
  backButton: ViewStyle;
  backText: TextStyle;
  submitDisabled: ViewStyle;
}

export interface BalanceComponentStyle {
  container: ViewStyle;
  greetingSection: ViewStyle;
  nameTitle: TextStyle;
  dateText: TextStyle;
  balanceSection: ViewStyle;
  saldoHeader: ViewStyle;
  saldoTitleContainer: ViewStyle;
  saldoTitle: TextStyle;
  eyeIconContainer: ViewStyle;
  contaCorrenteTitle: TextStyle;
  valorSaldoText: TextStyle;
  pixelsImage1: ViewStyle;
  pixelsImage2: ViewStyle;
  whiteLine: ViewStyle;
}

export type BalanceValue = number | null;

export interface ForgotPasswordFormProps {
  onSubmitSuccess?: (email: string) => void;
}

export interface LoginFormProps {
  onLoginSuccess?: (email: string) => void;
}

export interface SignupFormProps {
  onSignupSuccess?: (email: string) => void;
}

export interface CardListExtractProps {
  filterFn?: (transaction: ITransaction) => boolean;
  title?: string;
}

export type EditedValuesMap = Record<string, string>;

export interface Transaction {
  tipo: "entrada" | "saida";
  valor: number;
}

export interface CardProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  variant?: "elevated" | "outlined";
}

export type AccountType = "corrente" | "poupança" | (string & {});

export interface BalanceComponentProps {
  balance: { account: AccountType; value: number | null };
  user: UserInfo;
}

export interface Props {
  style?: StyleProp<ViewStyle>;
}

export interface WidgetSettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export interface ForgotPageStyles {
  container: ViewStyle;
}

export interface SharedStyles {
  keyboardView: ViewStyle;
  scrollView: ViewStyle;
  scrollViewContent: ViewStyle;
  formContainer: ViewStyle;
  title: TextStyle;
  label: TextStyle;
  input: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  buttonDisabled: ViewStyle;
  backgroundPixelsTop: ViewStyle;
  backgroundPixelsBottom: ViewStyle;
}

export interface ToastStyles {
  baseToast: ViewStyle;
  errorToast: ViewStyle;
  successToast: ViewStyle;
  text1: TextStyle;
  text2: TextStyle;
}

export type ToastType = "success" | "error";
export type TransactionType = "deposito" | "cambio" | "transferencia";

export const TransactionTypeItems = [
  { label: "Depósito", value: "deposito" },
  { label: "Câmbio", value: "cambio" },
  { label: "Transferência", value: "transferencia" },
];

export interface EditFieldModalProps {
  visible: boolean;
  field: "name" | "email" | "password" | null;
  initialValue: string;
  onClose: () => void;
}

export interface PortfolioItem {
  name: string;
  value: number;
  color: string;
}

export interface ListHeaderProps {
  title?: string;
  isEditing: boolean;
  isDeleting: boolean;
  onSave: () => void;
  onCancel: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export type DonutChartProps = {
  data: PortfolioItem[];
  radius?: number;
  strokeWidth?: number;
} & ViewProps;

export interface DI {
  logger: ILoggerService;
  createTransaction: CreateTransaction;
  listUserTransactions: ListUserTransactions;
}
