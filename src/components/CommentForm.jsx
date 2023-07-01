import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showErrorAlert } from '../states/alert/action';
import { PropTypes } from '../utils/globalPropTypes';

function CommentForm({ commentThread }) {
  const [content, setContent] = useState('');
  const alert = useSelector((state) => state.alert);

  const dispatch = useDispatch();

  const handleContentChange = ({ target }) => {
    setContent(target.value);
  };

  const onCommentHandler = () => {
    if (!content) {
      dispatch(showErrorAlert('Mohon untuk mengisi semua kolom!'));
      return;
    }

    if (content.trim() || (alert !== null && alert.type !== 'error')) {
      commentThread(content);
      setContent('');
    }
  };

  return (
    <>
      <TextField
        id="content"
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        placeholder="Komentar ..."
        value={content}
        onChange={handleContentChange}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ marginTop: 3 }}
        onClick={onCommentHandler}
      >
        Kirim
      </Button>
    </>
  );
}

CommentForm.propTypes = {
  commentThread: PropTypes.func.isRequired,
};

export default CommentForm;
