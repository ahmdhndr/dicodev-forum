import { ThumbDown, ThumbDownOutlined, ThumbUp, ThumbUpOutlined } from '@mui/icons-material';
import { Avatar, Box, Divider, Typography } from '@mui/material';
import parser from 'html-react-parser';
import React from 'react';
import { useDispatch } from 'react-redux';
import { showErrorAlert } from '../states/alert/action';
import {
  asyncDownVoteComment,
  asyncNeutralVoteComment,
  asyncUpVoteComment,
} from '../states/detailThread/action';
import { formatDate } from '../utils/formatDate';
import { PropTypes, commentShape, userShape } from '../utils/globalPropTypes';

function CommentItem({ comment, authUser }) {
  const { id, owner, createdAt, content, upVotesBy, downVotesBy } = comment;
  const isCommentUpVoted = upVotesBy.includes(authUser?.id);
  const isCommentDownVoted = downVotesBy.includes(authUser?.id);

  const dispatch = useDispatch();

  const upVoteCommentHandler = () => {
    if (authUser === null) {
      dispatch(showErrorAlert('Anda harus masuk terlebih dahulu'));
    } else if (upVotesBy.includes(authUser?.id)) {
      dispatch(
        asyncNeutralVoteComment({
          commentId: id,
        }),
      );
    } else {
      dispatch(
        asyncUpVoteComment({
          commentId: id,
        }),
      );
    }
  };

  const downVoteCommentHandler = () => {
    if (authUser === null) {
      dispatch(showErrorAlert('Anda harus masuk terlebih dahulu'));
    } else if (downVotesBy.includes(authUser?.id)) {
      dispatch(
        asyncNeutralVoteComment({
          commentId: id,
        }),
      );
    } else {
      dispatch(
        asyncDownVoteComment({
          commentId: id,
        }),
      );
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar alt={owner.name} src={owner.avatar} />
          <Typography variant="h6">{owner.name}</Typography>
        </Box>
        <Typography fontWeight={300}>{formatDate(createdAt)}</Typography>
      </Box>

      <Box
        sx={{
          fontFamily: '"Roboto Slab", serif',
          fontWeight: 300,
          marginY: 2,
        }}
      >
        {parser(content)}
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mt: 1,
        }}
      >
        <Box
          onClick={upVoteCommentHandler}
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        >
          {isCommentUpVoted ? (
            <ThumbUp sx={{ marginRight: 0.5, fontSize: 18 }} />
          ) : (
            <ThumbUpOutlined sx={{ marginRight: 0.5, fontSize: 18 }} />
          )}
          <Typography variant="p">{upVotesBy.length}</Typography>
        </Box>
        <Box
          onClick={downVoteCommentHandler}
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        >
          {isCommentDownVoted ? (
            <ThumbDown sx={{ marginRight: 0.5, fontSize: 18 }} />
          ) : (
            <ThumbDownOutlined sx={{ marginRight: 0.5, fontSize: 18 }} />
          )}
          <Typography variant="p">{downVotesBy.length}</Typography>
        </Box>
      </Box>
      <Divider sx={{ marginTop: 2, marginBottom: 5 }} />
    </Box>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape(commentShape).isRequired,
  authUser: PropTypes.shape(userShape),
};

CommentItem.defaultProps = {
  authUser: null,
};

export default CommentItem;
