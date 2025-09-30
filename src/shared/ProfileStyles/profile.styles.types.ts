import { UserInfo } from "firebase/auth";
import { ReactNode } from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { ITransaction } from "../interfaces/auth.interfaces";

export type ProfileStyles = {
  container: ViewStyle;
  header: ViewStyle;
  avatarCircle: ViewStyle;
  avatarText: TextStyle;
  userName: TextStyle;
  userEmail: TextStyle;
  scrollContent: ViewStyle;
  logoutButton: ViewStyle;
  logoutButtonText: TextStyle;
};

export type ConfirmModalProps = {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export type DashboardStyles = {
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
  container: ViewStyle;
  cardPixelsTop: ViewStyle;
  cardPixelsBotton: ViewStyle;
  content: ViewStyle;
  wrapper: ViewStyle;
  row: ViewStyle;
  card: ViewStyle;
  cardTitle: TextStyle;
  cardValue: TextStyle;
  balance: ViewStyle;
  balanceLabel: TextStyle;
  balanceValue: TextStyle;
};

export type AppLayoutStyles = {
  loaderContainer: ViewStyle;
  drawerStyle: ViewStyle;
  drawerLabel: TextStyle;
  drawerItem: ViewStyle;
};

export type ChartStyles = {
  chartContainer: ViewStyle;
};

export type TransactionsStyles = {
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
};

export type EditFieldModalStyles = {
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
};

export type HeaderStyles = {
  container: ViewStyle;
  row: ViewStyle;
  centerLogo: ViewStyle;
};

export type DashboardExtraStyles = {
  wrapper: ViewStyle;
  row: ViewStyle;
  card: ViewStyle;
  cardTitle: TextStyle;
  cardValue: TextStyle;
  balance: ViewStyle;
  balanceLabel: TextStyle;
  balanceValue: TextStyle;
};

export type NewTransactionFormStyle = {
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
};

export type WidgetPreferences = {
  spendingAlert: boolean;
  savingsGoal: boolean;
};

export type InvestmentsScreenStyles = {
  container: ViewStyle;
  title: TextStyle;
};

export type WidgetPreferencesContextType = {
  preferences: WidgetPreferences;
  updatePreferences: (newPrefs: WidgetPreferences) => void;
};

export type ForgotPasswordFormStyles = {
  card: ViewStyle;
  title: TextStyle;
  label: TextStyle;
  input: TextStyle;
  submit: ViewStyle;
  submitText: TextStyle;
  backButton: ViewStyle;
  backText: TextStyle;
  submitDisabled: ViewStyle;
};

export type BalanceComponentStyle = {
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
};
export type BalanceValue = number | null;

export type ForgotPasswordFormProps = {
  onSubmitSuccess?: (email: string) => void;
};

export type LoginFormProps = {
  onLoginSuccess?: (email: string) => void;
};

export type SignupFormProps = {
  onSignupSuccess?: (email: string) => void;
};

export type CardListExtractProps = {
  filterFn?: (transaction: ITransaction) => boolean;
  title?: string;
};

export type EditedValuesMap = {
  [key: string]: string;
};


export type Transaction = {
  tipo: "entrada" | "saida";
  valor: number;
};

export type CardProps = {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  variant?: "elevated" | "outlined";
};



export type AccountType = "corrente" | "poupança" | string;

export type BalanceComponentProps = {
  balance: { account: AccountType; value: number | null };
  user: UserInfo;
};

export type Props = {
  style?: StyleProp<ViewStyle>;
};

export type WidgetSettingsModalProps = {
  open: boolean;
  onClose: () => void;
};

export type ForgotPageStyles = {
  container: ViewStyle;
};

export type SharedStyles = {
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
  backgroundPixelsTop : ViewStyle;
  backgroundPixelsBottom: ViewStyle;
};

export type ToastStyles = {
  baseToast: ViewStyle;
  errorToast: ViewStyle;
  successToast: ViewStyle;
  text1: TextStyle;
  text2: TextStyle;
};

export type ToastType = "success" | "error";
export type TransactionType = "deposito" | "cambio" | "transferencia";
export const TransactionTypeItems = [
  { label: "Depósito", value: "deposito" },
  { label: "Câmbio", value: "cambio" },
  { label: "Transferência", value: "transferencia" },
];

export type EditFieldModalProps = {
  visible: boolean;
  field: "name" | "email" | "password" | null;
  initialValue: string;
  onClose: () => void;
};

export type PortfolioItem = {
  name: string;
  value: number;
  color: string;
};

export type ListHeaderProps = {
  title?: string;
  isEditing: boolean;
  isDeleting: boolean;
  onSave: () => void;
  onCancel: () => void;
  onEdit: () => void;
  onDelete: () => void;
};


export type DonutChartProps = {
  data: PortfolioItem[];
  radius?: number;
  strokeWidth?: number;
} & ViewProps; 
