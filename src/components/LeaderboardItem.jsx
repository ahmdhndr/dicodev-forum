import { Avatar, Box, Divider, Typography } from '@mui/material';
import React from 'react';
import capitalizeFirstLetter from '../utils/CapitalizeFirstLetter';
import { PropTypes, userShape } from '../utils/globalPropTypes';

function LeaderboardItem({ user, score }) {
  const { name, avatar } = user;
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar alt={name} src={avatar} />
          <Typography variant="h6">{capitalizeFirstLetter(name)}</Typography>
        </Box>
        <Typography fontWeight={700} fontSize={24}>
          {score}
        </Typography>
      </Box>
      <Divider sx={{ marginY: 3 }} />
    </>
  );
}

LeaderboardItem.propTypes = {
  ...userShape,
  score: PropTypes.number.isRequired,
};

export default LeaderboardItem;
