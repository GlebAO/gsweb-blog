import { publicFetch } from "./fetch";
import { SignupFormValues } from "../pages/signup";
import { LoginFormValues } from "../pages/login";

export default class AuthService {
  signup = async (credentials: SignupFormValues) => {
    const { data } = await publicFetch.post(`/signup`, credentials);
    return data;
  };
  login = async (credentials: LoginFormValues) => {
    const { data } = await publicFetch.post(`/login`, credentials);
    return data;
  };
}
