import { publicFetch } from "./fetch";
import { SignupFormValues } from "../pages/auth/signup";
import { LoginFormValues } from "../pages/auth/login";

export default class AuthService {
  signup = async (credentials: SignupFormValues) => {
    const { data } = await publicFetch.post(`/signup`, credentials);
    return data;
  };
  login = async (credentials: LoginFormValues) => {
    const { data } = await publicFetch.post(`/login`, credentials);
    return data;
  };
  confirm = async (token: string) => {
    const { data } = await publicFetch.get(`/signup/confirm?token=${token}`);
    return data;
  }
}
