import { ReactNode } from "react";

export interface ErrorMapping {
  userMessage: string;
  code: string;
}

export interface Props {
  children: ReactNode;
}

export interface State {
  hasError: boolean;
}
