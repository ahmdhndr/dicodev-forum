import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { asyncSetAuthUser } from '../states/authUser/action';
import { PropTypes, alertShape } from '../utils/globalPropTypes';
import { REGISTER_PATH } from '../utils/Constants';

function LoginPage({ alert }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
    if (alert !== null && alert.type !== 'error') {
      navigate('/');
    }
  };

  return (
    <Container
      component="section"
      maxWidth="sm"
      sx={{
        marginTop: 5,
        textAlign: 'center',
      }}
    >
      <img alt="Dicodev Logo" src="/dicodev-logo.svg" width={70} />
      <Box sx={{ marginTop: 2 }}>
        <LoginForm login={onLogin} />
      </Box>
      <Typography sx={{ marginTop: 1, textAlign: 'left' }}>
        Belum punya akun? <Link to={REGISTER_PATH}>Daftar di sini.</Link>
      </Typography>
    </Container>
  );
}

LoginPage.propTypes = {
  alert: PropTypes.shape(alertShape),
};

LoginPage.defaultProps = {
  alert: null,
};

export default LoginPage;
