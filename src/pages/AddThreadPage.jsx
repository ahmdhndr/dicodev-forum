import {
  Box,
  Button,
  Container,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { showErrorAlert, showSuccessAlert } from '../states/alert/action';
import { userShape } from '../utils/globalPropTypes';

function AddThreadPage({ addThread, authUser }) {
  const navigate = useNavigate();
  const [title, setTitle] = useInput('');
  const [category, setCategory] = useInput('');
  const [body, setBody] = useInput('');

  const dispatch = useDispatch();

  const addThreadFn = () => {
    if (!title || !category || !body) {
      dispatch(showErrorAlert('Mohon untuk mengisi semua kolom!'));
      return;
    }

    addThread({ title, category, body });
    dispatch(showSuccessAlert('Utas berhasil dibuat'));
    setTitle('');
    setCategory('');
    setBody('');
    navigate('/');
  };

  const handleTitleChange = ({ target }) => {
    setTitle(target.value);
  };

  const handleCategoryChange = ({ target }) => {
    setCategory(target.value);
  };

  const handleBodyChange = ({ target }) => {
    setBody(target.value);
  };

  return authUser ? (
    <Container component="section" sx={{ marginTop: 5 }} maxWidth="sm">
      <Typography variant="h5">Buat Utas Baru</Typography>
      <Divider sx={{ marginBottom: 3 }} />
      <Box>
        <TextField
          id="title"
          fullWidth
          variant="outlined"
          label="Judul"
          value={title}
          onChange={handleTitleChange}
        />
        <TextField
          id="category"
          fullWidth
          variant="outlined"
          label="Kategori"
          sx={{ marginY: 3 }}
          value={category}
          onChange={handleCategoryChange}
        />
        <TextField
          id="body"
          fullWidth
          multiline
          rows={4}
          label="Isi Utas"
          variant="outlined"
          value={body}
          onChange={handleBodyChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ marginTop: 3 }}
          onClick={addThreadFn}
        >
          Buat Utas
        </Button>
      </Box>
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
