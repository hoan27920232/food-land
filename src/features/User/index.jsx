import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useMetaTags from "react-metatags-hook";
import LoginForm from "features/User/Login/index";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import UserRegister from "./UserRegister/UserRegister";
import UserInfo from "./UserUpdateInfo/UserInfo";
import ChangePassword from "./ChangePassword/index";
import HistoryPurchase from "./HistoryPurchase/index";
import GetResetForm from "./Get Reset";
import ResetPassForm from "./Reset Pass";

function User() {
  const match = useRouteMatch();
  useMetaTags({
    title: "Account",
  });

  const token = useSelector((state) => state.me.token);
  useEffect(() => {
    // async function fetchAPI(){
    //   const action = getMe();
    //   await dispatch(action);
    //   console.log(user,'--------------------');
    // }
    // fetchAPI();
    
  }, []);
  return (
    <div>
      {token == "" ? (
        <Switch>
          <Route path={`${match.url}/register`} component={UserRegister} />
          <Route path={`${match.url}/login`} component={LoginForm} />
          <Route path={`${match.url}/getreset`} component={GetResetForm} />
          <Route path={`${match.url}/resetpassword`} component={ResetPassForm} />

          <Redirect to="/account/login" />
        </Switch>
      ) : (
        <Switch>
          <Route exact path={`${match.url}`} component={UserInfo} />
          <Route path={`${match.url}/change-password`} component={ChangePassword} />
          <Route path={`${match.url}/history-purchase`} component={HistoryPurchase} />
        </Switch>
      )}
    </div>
  );
}

export default User;
