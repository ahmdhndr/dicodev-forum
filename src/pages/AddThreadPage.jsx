import { Container, Divider, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { showSuccessAlert } from '../states/alert/action';
import { userShape } from '../utils/globalPropTypes';
import AddThreadForm from '../components/AddThreadForm';

function AddThreadPage({ addThread, authUser }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const addThreadHandler = ({ title, category, body }) => {
    addThread({ title, category, body });
    dispatch(showSuccessAlert('Utas berhasil dibuat'));
    navigate('/');
  };

  return authUser ? (
    <Container component="section" sx={{ marginTop: 5 }} maxWidth="sm">
      <Typography variant="h5">Buat Utas Baru</Typography>
      <Divider sx={{ marginBottom: 3 }} />
      <AddThreadForm addThreadFn={addThreadHandler} />
    </Container>
  ) : (
    <Navigate to="/login" replace />
  );
}

AddThreadPage.propTypes = {
  authUser: PropTypes.shape(userShape),
  addThread: PropTypes.func.isRequired,
};

AddThreadPage.defaultProps = {
  authUser: null,
};

export default AddThreadPage;
