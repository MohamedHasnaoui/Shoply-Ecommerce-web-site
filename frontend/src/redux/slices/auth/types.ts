import { SigninMutation } from "../../../generated";

export interface IAuth {
  currentUser: SigninMutation["signin"]["user"] | null;
  signupEmail: string | null;
}
