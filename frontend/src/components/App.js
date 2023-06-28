import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js'
import MyProfile from './MyProfile.js'
import ProtectedRoute from './ProtectedRoute.js';
import api from '../utils/Api.js';
import InfoTooltrip from './InfoTooltip.js';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isAuthPopupOpen, setAuthPopupOpen] = React.useState(false);
  const [isAuthStatus, setAuthStatus] = React.useState(false);

  React.useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      api.getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate("/profile", { replace: true })
          }
        }).catch(err => {
          console.log(err);
        });
    }
  }

  function closePopupAuth() {
    setAuthPopupOpen(false);
  }

  function handleSubmitLogin(email, password, onLogin) {
    if (!email || !password) {
      setAuthPopupOpen(true);
      setAuthStatus(false);
      return;
    }

    setIsLoading(true);
    api.authorize(email, password)
      .then((data) => {
        if (data.token) {
          onLogin(data.token);
          return data;
        }
      })
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          navigate('/', { replace: true });
        }
      })
      .catch(err => {
        setAuthPopupOpen(true);
        setAuthStatus(false);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSubmitRegister(email, password) {
    setIsLoading(true);
    api.register(email, password)
      .then(() => {
        setAuthStatus(true);
        setAuthPopupOpen(true);
      })
      .catch(err => {
        console.log(err);
        setAuthStatus(false);
        setAuthPopupOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (

    <div className="body">
      <div className="page">
        <Routes>
          <Route path="/" element={<ProtectedRoute element={loggedIn ? MyProfile : Login} loggedIn={loggedIn} />} />
          <Route path="/profile" element={<ProtectedRoute element={MyProfile} loggedIn={loggedIn} />} />
          <Route path="/sign-in" element={<Login handleSubmit={handleSubmitLogin} isLoading={isLoading} />} />
          <Route path="/sign-up" element={<Register handleSubmit={handleSubmitRegister} isLoading={isLoading} />} />
        </Routes>

        <InfoTooltrip isOpen={isAuthPopupOpen} status={isAuthStatus} isClose={closePopupAuth} name="auth" />
      </div>
    </div>

  );
}

export default App;