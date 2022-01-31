import { PopoverOrigin } from "@mui/material";
import { IOnboarding } from "../../../../redux/types";

export interface IOnboardingProps {
  open: boolean;
  anchorElement: HTMLAnchorElement;
  nextElement: keyof IOnboarding;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
  title?: string;
  text?: string;
}