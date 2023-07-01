import { ThumbDown, ThumbDownOutlined, ThumbUp, ThumbUpOutlined } from '@mui/icons-material';
import { Avatar, Box, Breadcrumbs, Divider, Typography } from '@mui/material';
import parser from 'html-react-parser';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { showErrorAlert } from '../states/alert/action';
import {
  asyncDownVoteDetailThread,
  asyncNeutralVoteDetailThread,
  asyncUpVoteDetailThread,
} from '../states/detailThread/action';
import { formatDate } from '../utils/formatDate';
import { PropTypes, threadShape, userShape } from '../utils/globalPropTypes';
import { HOME_PATH } from '../utils/Constants';

function DetailThread({ detailThread, authUser }) {
  const { title, body, owner, category, createdAt, upVotesBy, downVotesBy } = detailThread;

  const dispatch = useDispatch();

  const isThreadUpVoted = upVotesBy.includes(authUser?.id);
  const isThreadDownVoted = downVotesBy.includes(authUser?.id);

  const upVoteDetailThreadHandler = () => {
    if (authUser === null) {
      dispatch(showErrorAlert('Anda harus masuk terlebih dahulu'));
    } else if (upVotesBy.includes(authUser?.id)) {
      dispatch(
        asyncNeutralVoteDetailThread({
          userId: authUser.id,
        }),
      );
    } else {
      dispatch(
        asyncUpVoteDetailThread({
          userId: authUser.id,
        }),
      );
    }
  };

  const downVoteDetailThreadHandler = () => {
    if (authUser === null) {
      dispatch(showErrorAlert('Anda harus masuk terlebih dahulu'));
    } else if (downVotesBy.includes(authUser?.id)) {
      dispatch(
        asyncNeutralVoteDetailThread({
          userId: authUser.id,
        }),
      );
    } else {
      dispatch(
        asyncDownVoteDetailThread({
          userId: authUser.id,
        }),
      );
    }
  };

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 3 }}>
        <Link to={HOME_PATH}>Beranda</Link>
        <Typography>{title}</Typography>
      </Breadcrumbs>
      <Typography variant="h5" fontWeight={700}>
        {title}
      </Typography>
      <Box
        sx={{
          marginY: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <Typography sx={{ fontWeight: 300 }}>Dibuat oleh</Typography>
          <Avatar alt={owner.name} src={owner.avatar} sx={{ width: 24, height: 24 }} />{' '}
          <Typography>{owner.name}</Typography>
        </Box>
        <Typography sx={{ fontWeight: 300 }}>{formatDate(createdAt)}</Typography>
      </Box>
      <Divider sx={{ marginTop: 1 }} />
      <Box sx={{ marginY: 1 }}>
        <Box
          sx={{
            fontFamily: '"Roboto Slab", serif',
            fontWeight: 300,
            marginY: 2,
          }}
        >
          {parser(body)}
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            marginY: 1,
          }}
        >
          <Box
            onClick={upVoteDetailThreadHandler}
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
            onClick={downVoteDetailThreadHandler}
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          >
            {isThreadDownVoted ? (
              <ThumbDown sx={{ marginRight: 0.5, fontSize: 18 }} />
            ) : (
              <ThumbDownOutlined sx={{ marginRight: 0.5, fontSize: 18 }} />
            )}
            <Typography variant="p">{downVotesBy.length}</Typography>
          </Box>
        </Box>
      </Box>
      <Typography fontWeight={300}>#{category}</Typography>
    </>
  );
}

DetailThread.propTypes = {
  detailThread: PropTypes.shape(threadShape).isRequired,
  authUser: PropTypes.shape(userShape),
};

DetailThread.defaultProps = {
  authUser: null,
};

export default DetailThread;
