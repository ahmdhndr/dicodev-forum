import { Box, Container, Divider, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeaderboardsList from '../components/LeaderboardsList';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';

function LeaderboardPage() {
  const leaderboards = useSelector((state) => state.leaderboards);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <Container component="section" maxWidth="sm" sx={{ marginTop: 3 }}>
      <Typography variant="h5" marginTop={3} marginBottom={0.5}>
        Klasemen DicoDev Forum
      </Typography>
      <Divider sx={{ marginBottom: 3 }} />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 2,
        }}
      >
        <Typography>Daftar Pengguna</Typography>
        <Typography>Poin</Typography>
      </Box>
      <LeaderboardsList leaderboards={leaderboards} />
    </Container>
  );
}

export default LeaderboardPage;
