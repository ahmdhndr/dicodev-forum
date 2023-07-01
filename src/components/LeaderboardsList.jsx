import { Box } from '@mui/material';
import React from 'react';
import LeaderboardItem from './LeaderboardItem';
import { PropTypes, userShape } from '../utils/globalPropTypes';

function LeaderboardsList({ leaderboards }) {
  return (
    <Box>
      {leaderboards.map((leaderboard) => (
        <LeaderboardItem key={leaderboard.user.id} {...leaderboard} />
      ))}
    </Box>
  );
}

LeaderboardsList.propTypes = {
  leaderboards: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape(userShape),
      score: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default LeaderboardsList;
