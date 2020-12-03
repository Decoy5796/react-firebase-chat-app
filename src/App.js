import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useHistory } from 'react-router-dom';

import { setUser } from './redux/actions/user_action';

import ChatPage from './components/ChatPage/ChatPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import firebase from './firebase';

function App() {
  let history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Login success
        history.push('/');
        dispatch(setUser(user));
      } else {
        // Login fail
        history.push('/login');
      }
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <div>loading ...</div>
      ) : (
        <Switch>
          <Route exact path='/' component={ChatPage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/register' component={RegisterPage} />
        </Switch>
      )}
    </>
  );
}

export default App;
