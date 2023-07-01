import { Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import { childrenProps } from '../utils/globalPropTypes';

function SectionThread({ children }) {
  return (
    <Grid
      item
      xs={12}
      lg={9}
      sx={{
        paddingRight: { lg: 2 },
        marginBottom: 6,
        order: { xs: 2, lg: 1 },
        WebkitOrder: { xs: '2', lg: '1' },
      }}
    >
      <Typography variant="h5" marginTop={3} marginBottom={0.5}>
        Utas Tersedia
      </Typography>
      <Divider sx={{ marginBottom: 3 }} />
      {children}
    </Grid>
  );
}

SectionThread.propTypes = {
  children: childrenProps.isRequired,
};

export default SectionThread;
