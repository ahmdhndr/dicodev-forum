import {
  ForumOutlined,
  ThumbDown,
  ThumbDownOutlined,
  ThumbUp,
  ThumbUpOutlined,
} from '@mui/icons-material';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import parser from 'html-react-parser';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { showErrorAlert } from '../states/alert/action';
import {
  asyncDownVoteThread,
  asyncNeutralVoteThread,
  asyncUpVoteThread,
} from '../states/threads/action';
import { formatDate } from '../utils/formatDate';
import { PropTypes, threadShape, userShape } from '../utils/globalPropTypes';

function ThreadItem({
  authUser,
  id,
  title,
  body,
  category,
  createdAt,
  user,
  upVotesBy,
  downVotesBy,
  totalComments,
}) {
  const dispatch = useDispatch();

  const isThreadUpVoted = upVotesBy.includes(authUser?.id);
  const isThreadDownVoted = downVotesBy.includes(authUser?.id);

  const onUpVoteClick = () => {
    if (authUser === null) {
      dispatch(showErrorAlert('Anda harus masuk terlebih dahulu'));
    } else if (upVotesBy.includes(authUser?.id)) {
      dispatch(asyncNeutralVoteThread(id));
    } else {
      dispatch(asyncUpVoteThread(id));
    }
  };

  const onDownVoteClick = () => {
    if (authUser === null) {
      dispatch(showErrorAlert('Anda harus masuk terlebih dahulu'));
    } else if (downVotesBy.includes(authUser?.id)) {
      dispatch(asyncNeutralVoteThread(id));
    } else {
      dispatch(asyncDownVoteThread(id));
    }
  };

  return (
    <Grid item xs={12} md={6}>
      <Card
        variant="outlined"
        sx={{
          bgcolor: 'transparent',
          border: '1px solid var(--black-clr)',
        }}
      >
        <CardContent>
          <Typography variant="h5" fontWeight="bold">
            <Link to={`/threads/${id}`}>{title}</Link>
          </Typography>
          <Box
            className="truncate"
            marginY={2}
            sx={{ fontFamily: '"Roboto Slab", serif', fontWeight: 300 }}
          >
            {parser(body)}
          </Box>
          <Typography
            display="inline-block"
            variant="p"
            border={1}
            borderColor="primary"
            borderRadius={1}
            padding={1}
            marginBottom={2}
          >
            #{category.toLowerCase()}
          </Typography>
          <Box>{formatDate(createdAt)}</Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mt: 1,
            }}
          >
            <Box
              onClick={onUpVoteClick}
              sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            >
              {isThreadUpVoted ? (
                <ThumbUp sx={{ marginRight: 0.5, fontSize: 18 }} />
              ) : (
                <ThumbUpOutlined sx={{ marginRight: 0.5, fontSize: 18 }} />
              )}
              <Typography variant="p">{upVotesBy.length}</Typography>
            </Box>
            <Box
              onClick={onDownVoteClick}
              sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            >
              {isThreadDownVoted ? (
                <ThumbDown sx={{ marginRight: 0.5, fontSize: 18 }} />
              ) : (
                <ThumbDownOutlined sx={{ marginRight: 0.5, fontSize: 18 }} />
              )}
              <Typography variant="p">{downVotesBy.length}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ForumOutlined sx={{ marginRight: 0.5, fontSize: 18 }} />
              <Typography variant="p">{totalComments}</Typography>
            </Box>
            <Typography>
              Dibuat oleh <span style={{ fontWeight: 700 }}>{user.name}</span>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

ThreadItem.propTypes = {
  ...threadShape,
  authUser: PropTypes.shape(userShape),
};

ThreadItem.defaultProps = {
  authUser: null,
};

export default ThreadItem;
