import React, { useContext } from "react";
import { SquareLogo } from "../../components/common/square-logo";
import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import { FormInput, Button, FormAlert } from "../../components/form";
import { string, object } from "yup";
import { AppContext } from "../../reducers";
import { AuthServiceContext } from "../../context";
import { authenticate } from "../../actions/auth/actions";
import { Redirect } from "react-router-dom";

export interface SignupFormValues {
  name: string;
  email: string;
  password: string;
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
});

const Signup = () => {
  const authService = useContext(AuthServiceContext);
  const { state, dispatch, isAuthenticated } = useContext(AppContext);

  const { requested, message, authenticated, setRedirect } = state.auth;

  const submitCredentials = (values: SignupFormValues) => {
    if (authService) {
      dispatch(authenticate(authService, values));
    }
  };

  return (
    <>
      {(setRedirect && isAuthenticated()) && <Redirect to="/" />}
      <div className="w-50 m-auto h-100 py-5">
        <div className="card bg-white shadow-sm">
          <div className="card-body p-lg-5">
            <div className="text-center">
              <div className="mb-3">
                <SquareLogo />
              </div>
              <h1 className="h3 text-bold">Добро пожаловть в GSweb</h1>
              <p className="text-muted">
                Уже есть аккаунт? <Link to="/login">Войдите</Link>
              </p>
            </div>
            <div className="m-auto col-md-6">
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={(values) => submitCredentials(values)}
              >
                {() => (
                  <Form>
                    {message && (
                      <FormAlert text={message} success={authenticated} />
                    )}
                    <div className="mb-3">
                      <FormInput
                        ariaLabel="Имя"
                        name="name"
                        type="text"
                        placeholder="Имя"
                      />
                    </div>
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
                        text="Зарегистрироваться"
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

export default Signup;
