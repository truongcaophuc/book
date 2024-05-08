import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { login,loginWithGoogle, clearErrors } from "../../actions/userActions";
import {  useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();
  const history = useNavigate();
  const loginSuccess = async ({ access_token }) => {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(loginWithGoogle(data));
  };
  const loginFailure = (response) => {
    console.log("Login failure", response);
  };
  const loginGoogle = useGoogleLogin({
    onSuccess: loginSuccess,
    onError: loginFailure,
  });
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (isAuthenticated) {
      history(redirect);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Login"} />

          <h3 className="title-30 text-center mb-35">Đăng nhập tài khoản</h3>
          <form className="login-form" onSubmit={submitHandler}>
            <div className="row">
              <div className="col-12">
                <div className="form-inner">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="fname"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-inner hidden-icon">
                  <label htmlFor="email_password">Mật khẩu</label>
                  <input
                    type="password"
                    name="name"
                    placeholder="abcdef*****"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-inner d-flex justify-content-between">
                  <label></label>
                  <Link to="/password/forgot" className="forget-password">
                    Quên mật khẩu?
                  </Link>
                </div>
              </div>
            
              <div className="col-12">
                <div className="form-inner flex justify-center">
                  <button
                    className="px-[20px] py-[10px] text-[white] hover:text-[#1976D2] bg-[#1976D2] border-[1px] border-[#1976D2]  hover:bg-[white]"
                    type="submit"
                  >
                
                     Đăng nhập 
                   
                  </button>
                </div>
              </div>
              <div className="w-[100%] text-center">Hoặc</div>
              <div className="flex justify-center w-[100%]">

              <button
          className="hover:opacity-[0.9] flex justify-center bg-[#3f81f9] text-white py-[10px] mt-[25px] rounded px-[10px]"
          onClick={() => {
            loginGoogle();
          }}
        >
          <img
            src="images/google.png"
            className="w-[30px] h-[30px] bg-white rounded p-[5px] mr-[15px]"
            />
          Đăng nhập với google
        </button>
            </div>
            </div>
          </form>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
