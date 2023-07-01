import React from 'react';
import CommentItem from './CommentItem';
import { PropTypes, commentShape, userShape } from '../utils/globalPropTypes';

function CommentList({ comments, authUser }) {
  return comments.map((comment) => (
    <CommentItem key={comment.id} comment={comment} authUser={authUser} />
  ));
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(commentShape)).isRequired,
  authUser: PropTypes.shape(userShape),
};

export default CommentList;
