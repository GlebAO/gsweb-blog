import React, { useContext } from "react";
import { SquareLogo } from "../components/common/square-logo";
import { Form, Formik } from "formik";
import { FormInput, Button, FormAlert } from "../components/form";
import { string, object } from "yup";
import { AppContext } from "../reducers";
import { AuthServiceContext } from "../context";
import { login } from "../actions/auth/actions";
import { Redirect } from "react-router-dom";

export interface LoginFormValues {
  email: string;
  password: string;
}

const LoginSchema = object().shape({
  email: string()
    .email("Укажите Email в правильном формате")
    .required("Укажите Email"),
  password: string()
    .required("Укажите пароль")
    .min(8, "Минимум 8 символов")
    .max(100),
});

const Login = () => {
  const authService = useContext(AuthServiceContext);
  const { state, dispatch, isAuthenticated } = useContext(AppContext);

  const { requested, message, authenticated, setRedirect } = state.auth;

  const submitCredentials = (values: LoginFormValues) => {
    if (authService) {
      dispatch(login(authService, values));
    }
  };

  return (
    <>
    {(setRedirect && isAuthenticated()) && <Redirect to="/"/>}
      <div className="w-50 m-auto h-100 py-5">
        <div className="card bg-white shadow-sm">
          <div className="card-body p-lg-5">
            <div className="text-center">
              <div className="mb-3">
                <SquareLogo />
              </div>
              <h1 className="h3 text-bold mb-3">Добро пожаловть в GSweb</h1>
            </div>
            <div className="m-auto col-md-6">
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={LoginSchema}
                onSubmit={(values) => submitCredentials(values)}
              >
                {() => (
                  <Form>
                    {message && (
                      <FormAlert text={message} success={authenticated} />
                    )}
                    <div className="mb-3">
                      <FormInput
                        ariaLabel="Email"
                        name="email"
                        type="email"
                        placeholder="Email"
                      />
                    </div>
                    <div className="mb-3">
                      <FormInput
                        ariaLabel="Пароль"
                        name="password"
                        type="password"
                        placeholder="Пароль"
                      />
                    </div>
                    <div className="mt-3">
                      <Button
                        text="Войти"
                        type="submit"
                        loading={requested && !authenticated}
                        block={true}
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
