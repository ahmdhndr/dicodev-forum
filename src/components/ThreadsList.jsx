import { Grid } from '@mui/material';
import React from 'react';
import ThreadItem from './ThreadItem';
import { PropTypes, threadShape, userShape } from '../utils/globalPropTypes';

function ThreadsList({ threads, authUser }) {
  return (
    <Grid container spacing={2}>
      {threads.map((thread) => (
        <ThreadItem key={thread.id} {...thread} authUser={authUser} />
      ))}
    </Grid>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadShape)).isRequired,
  authUser: PropTypes.shape(userShape),
};

ThreadsList.defaultProps = {
  authUser: null,
};

export default ThreadsList;
