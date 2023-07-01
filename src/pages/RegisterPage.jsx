import { Box, Container } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import { showSuccessAlert } from '../states/alert/action';
import { asyncRegisterUser } from '../states/users/action';
import { PropTypes, alertShape } from '../utils/globalPropTypes';

function RegisterPage({ alert }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
    if (alert !== null && alert.type !== 'error') {
      dispatch(showSuccessAlert('Akun berhasil dibuat'));
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
        <RegisterForm register={onRegister} />
      </Box>
    </Container>
  );
}

RegisterPage.propTypes = {
  alert: PropTypes.shape(alertShape),
};

RegisterPage.defaultProps = {
  alert: null,
};

export default RegisterPage;
