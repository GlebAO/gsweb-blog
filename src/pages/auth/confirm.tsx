import React, { useEffect, useContext, useCallback } from "react";
import { Redirect, Link, useLocation } from "react-router-dom";
import { SquareLogo } from "../../components/common/square-logo";
import { useAppContext } from "../../reducers";
import { AuthServiceContext } from "../../context";
import { FormAlert } from "../../components/form";
import { confirmEmail, setRedirect as setRedirectAction } from "../../actions/auth/actions";

const Confirm = () => {
  const authService = useContext(AuthServiceContext);
  const { state, dispatch, isAuthenticated } = useAppContext();
  const { requested, message, confirmed, setRedirect } = state.auth;
  const { search } = useLocation();

  const stableDispatch = useCallback(dispatch, []);
  const isAuthed =  useCallback(isAuthenticated, []);

  useEffect(() => {
    const regex = new RegExp("token=(.{32})", "i");
    const results = regex.exec(search);
    if (results && results[1] && !isAuthed()) {
      stableDispatch(confirmEmail(results[1], authService!.confirm));
    } else {
      stableDispatch(setRedirectAction());
    }

  }, [search, stableDispatch, authService, isAuthed]);

  const renderSuccess = () => {
    return (
      <>
        <div className="mb-3">
          <FormAlert text={message} success={confirmed ? true : false} />
        </div>
        <Link to="/login" className="btn btn-block btn-primary">
          Войти
        </Link>
      </>
    );
  };

  return (
    <>
      {isAuthenticated() && <Redirect to="/" />}
      {!isAuthenticated() && setRedirect && <Redirect to="/login" />}
      <div className="auth-page m-auto h-100 py-5">
        <div className="card bg-white shadow-sm">
          <div className="card-body p-lg-5">
            <div className="text-center">
              <div className="mb-3">
                <SquareLogo />
              </div>
              <h1 className="h3 text-bold">Подтверждение email</h1>
            </div>
            <div className="m-auto mb-3">
              {requested && <span>Идет проверка токена</span>}
              {message && renderSuccess()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Confirm;
