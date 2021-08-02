import React, { useContext, useEffect } from "react";

import { HashRouter, Route, Switch } from 'react-router-dom';

import Transform from "./pages/Transform"
import Sheet from './pages/Sheet';
import Upload from './pages/Upload';

import Login from './authentication/Login'
import Signup from './authentication/Signup'
import ForgotPassword from './authentication/ForgotPassword'
import ChangePassword from './authentication/ChangePassword'
import My404Component from "./pages/My404Component";
import { topFunctions } from "./providers/TopProvider";

function App() {
  const {
    currentUser,
    message,
    pageColor
  } = useContext(topFunctions);
  return (
    <div className="App">
      <div className="body">
        <HashRouter>
          <Switch>
            <Route path="/" component={currentUser !== "" ? Upload : Login} exact />
            <Route path="/upload" component={currentUser !== "" ? Upload : Login} exact />
            <Route path="/sheet" component={currentUser !== "" ? Sheet : Login} exact />
            <Route path="/transform" component={currentUser !== "" ? Transform : Login} exact />


            <Route path="/login" component={currentUser !== "" ? Upload : Login} exact />
            <Route path="/signup" component={currentUser !== "" ? Upload : Signup} exact />
            <Route path="/forgot" component={currentUser !== "" ? Upload : ForgotPassword} exact />
            <Route path="/changepassword" component={currentUser !== "" ? Upload : ChangePassword} exact />


            <Route path='*' exact={true} component={My404Component} />


          </Switch>
        </HashRouter>
      </div>
    </div>
  );
}

export default App;
