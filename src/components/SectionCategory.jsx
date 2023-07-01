import { Box, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import { childrenProps } from '../utils/globalPropTypes';

function SectionCategory({ children }) {
  return (
    <Grid
      item
      xs={12}
      lg={2}
      sx={{
        order: { xs: 1, lg: 3 },
        WebkitOrder: { xs: '1', lg: '2' },
        maxWidth: { lg: '100%' },
      }}
    >
      <Box paddingLeft={{ lg: 2 }}>
        <Typography variant="h5" marginTop={3} marginBottom={0.5}>
          Kategori
        </Typography>
        <Divider sx={{ marginBottom: 3 }} />
        {children}
      </Box>
    </Grid>
  );
}

SectionCategory.propTypes = {
  children: childrenProps.isRequired,
};

export default SectionCategory;
