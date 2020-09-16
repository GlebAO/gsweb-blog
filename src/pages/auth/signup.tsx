import React, { useContext, useLayoutEffect, useCallback } from "react";
import { SquareLogo } from "../../components/common/square-logo";
import { Form, Formik } from "formik";
import {
  FormInput,
  Button,
  FormAlert,
  FormCheckbox,
} from "../../components/form";
import { string, object, ref, bool } from "yup";
import { AppContext } from "../../reducers";
import { AuthServiceContext } from "../../context";
import { authenticate, authReset } from "../../actions/auth/actions";
import { Redirect, Link } from "react-router-dom";

import "./auth.scss";

export interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  accept: boolean | null;
}

const SignupSchema = object().shape({
  name: string()
    .required("Укажите свoё имя")
    .min(2, "Минимум 2 символа")
    .max(50, "Слишком длинное имя"),
  email: string()
    .email("Укажите действующий адрес электронной почты")
    .required("Укажите Email"),
  password: string()
    .required("Укажите пароль")
    .min(8, "Минимум 8 символов")
    .max(100),
  confirmPassword: string()
    .oneOf([ref("password"), undefined], "Пароли не совпадают")
    .required("Укажите пароль ещё раз"),
  accept: bool().oneOf(
    [true],
    "Необходимо принять условия пользовательского соглашения"
  ),
});

const Signup = () => {
  const authService = useContext(AuthServiceContext);
  const { state, dispatch, isAuthenticated } = useContext(AppContext);
  const { requested, message, registered, setRedirect } = state.auth;

  const stableDispatch = useCallback(dispatch, []);
  useLayoutEffect(() => {
    stableDispatch(authReset());
  }, [stableDispatch]);

  const submitCredentials = (values: SignupFormValues) => {
    if (authService) {
      dispatch(authenticate(authService, values));
    }
  };

  return (
    <>
      {setRedirect && isAuthenticated() && <Redirect to="/" />}
      <div className="auth-page m-auto h-100 py-5">
        <div className="card bg-white shadow-sm">
          <div className="card-body p-lg-5">
            <div className="text-center">
              <Link to="/" className="d-block mb-3">
                <SquareLogo />
              </Link>
              <h1 className="h3 text-bold">Добро пожаловть в GSweb</h1>
              <p className="text-muted">
                Уже зарегистрированы? <Link to="/login">Войдите</Link>
              </p>
            </div>
            <div className="m-auto">
              {message && (
                <FormAlert text={message} success={registered ? true : false} />
              )}
              {!message && registered && (
                <FormAlert
                  text="Проверьте Вашу почту для завершения регистрации."
                  success={true}
                />
              )}
              {!registered && (
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    accept: true,
                  }}
                  validationSchema={SignupSchema}
                  onSubmit={(values) => submitCredentials(values)}
                >
                  {() => (
                    <Form>
                      <div className="signup-form-fields mb-5">
                        <div className="mb-3">
                          <FormInput
                            ariaLabel="Имя"
                            name="name"
                            type="text"
                            placeholder="Имя"
                            classes="form-control"
                          />
                        </div>
                        <div className="mb-3">
                          <FormInput
                            ariaLabel="Email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            classes="form-control"
                          />
                        </div>
                        <div className="mb-3">
                          <FormInput
                            ariaLabel="Пароль"
                            name="password"
                            type="password"
                            placeholder="Пароль"
                            classes="form-control"
                          />
                        </div>
                        <div className="mb-3">
                          <FormInput
                            ariaLabel="Повторите пароль"
                            name="confirmPassword"
                            type="password"
                            placeholder="Повторите пароль"
                            classes="form-control"
                          />
                        </div>
                        <div className="mb-3">
                          <FormCheckbox name="accept">
                            Я принимаю условия{" "}
                            <Link to="/policy">
                              Пользовательского соглашения
                            </Link>
                          </FormCheckbox>
                        </div>
                      </div>
                      <div>
                        <Button
                          text="Зарегистрироваться"
                          type="submit"
                          loading={requested && !registered}
                          block={true}
                          buttonType="primary"
                        />
                      </div>
                    </Form>
                  )}
                </Formik>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
