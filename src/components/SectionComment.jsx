import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes, commentShape, userShape } from '../utils/globalPropTypes';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { LOGIN_PATH } from '../utils/Constants';

function SectionComment({ comments, onCommentThread, authUser }) {
  return (
    <>
      <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 1 }}>
        Beri komentar
      </Typography>
      {authUser ? (
        <CommentForm commentThread={onCommentThread} />
      ) : (
        <Typography>
          <Link to={LOGIN_PATH}>Masuk</Link> untuk memberi komentar.
        </Typography>
      )}

      <Typography variant="h6" sx={{ marginTop: 3, marginBottom: 1 }}>
        {comments.length} komentar
      </Typography>
      <CommentList comments={comments} authUser={authUser} />
    </>
  );
}

SectionComment.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(commentShape)).isRequired,
  onCommentThread: PropTypes.func.isRequired,
  authUser: PropTypes.shape(userShape),
};

SectionComment.defaultProps = {
  authUser: null,
};

export default SectionComment;
