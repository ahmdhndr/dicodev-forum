import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import { Route, Routes } from 'react-router-dom';
import AlertPopup from './components/AlertPopup';
import Navigation from './components/Navigation';
import ProtectAuthPage from './components/ProtectAuthPage';
import AddThreadPage from './pages/AddThreadPage';
import DetailPage from './pages/DetailPage';
import HomePage from './pages/HomePage';
import LeaderboardPage from './pages/LeaderboardPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import { asyncUnsetAuthUser } from './states/authUser/action';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncPopulateUsersAndThreads } from './states/shared/action';
import { asyncAddThread } from './states/threads/action';
import './styles/styles.css';
import {
  ADD_NEW_THREAD_PATH,
  DETAIL_PATH,
  HOME_PATH,
  LEADERBOARD_PATH,
  LOGIN_PATH,
  NOT_FOUND_PATH,
  REGISTER_PATH,
} from './utils/Constants';

function App() {
  const alert = useSelector((state) => state.alert);
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onAddThreadHandler = ({ title, category, body }) => {
    dispatch(asyncAddThread({ title, category, body }));
  };

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  return (
    <>
      <LoadingBar style={{ background: '#222222' }} />
      <Navigation authUser={authUser} signOut={onSignOut} />
      <Container component="main" sx={{ position: 'relative' }}>
        <Routes>
          <Route path={HOME_PATH} element={<HomePage authUser={authUser} />} />
          <Route path={DETAIL_PATH} element={<DetailPage />} />
          <Route
            path={ADD_NEW_THREAD_PATH}
            element={
              <AddThreadPage
                authUser={authUser}
                addThread={onAddThreadHandler}
                alert={alert}
              />
            }
          />
          <Route path={LEADERBOARD_PATH} element={<LeaderboardPage />} />
          <Route
            path={LOGIN_PATH}
            element={
              <ProtectAuthPage authUser={authUser}>
                <LoginPage alert={alert} />
              </ProtectAuthPage>
            }
          />
          <Route
            path={REGISTER_PATH}
            element={
              <ProtectAuthPage authUser={authUser}>
                <RegisterPage alert={alert} />
              </ProtectAuthPage>
            }
          />
          <Route path={NOT_FOUND_PATH} element={<NotFoundPage />} />
        </Routes>
        <AlertPopup showAlert={alert} />
      </Container>
    </>
  );
}

export default App;
