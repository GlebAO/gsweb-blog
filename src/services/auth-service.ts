import { publicFetch } from "./fetch";
import { SignupFormValues } from "../pages/signup";

export default class AuthService {
  signup = async (credentials: SignupFormValues) => {
    const { data } = await publicFetch.post(`/signup`, credentials);
    return data;
  };
}
