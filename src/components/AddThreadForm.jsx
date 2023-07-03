import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import useInput from '../hooks/useInput';
import { showErrorAlert } from '../states/alert/action';
import { PropTypes } from '../utils/globalPropTypes';

function AddThreadForm({ addThreadFn }) {
  const [title, setTitle] = useInput('');
  const [category, setCategory] = useInput('');
  const [body, setBody] = useInput('');

  const dispatch = useDispatch();

  const addThreadHandler = () => {
    if (!title || !body) {
      dispatch(showErrorAlert('Mohon untuk mengisi semua kolom!'));
      return;
    }
    addThreadFn({ title, category, body });
    setTitle('');
    setCategory('');
    setBody('');
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

  return (
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
        onClick={addThreadHandler}
      >
        Buat Utas
      </Button>
    </Box>
  );
}

AddThreadForm.propTypes = {
  addThreadFn: PropTypes.func.isRequired,
};

export default AddThreadForm;
