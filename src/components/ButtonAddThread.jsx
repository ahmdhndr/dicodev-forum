import { Box, Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { ADD_NEW_THREAD_PATH } from '../utils/Constants';

function ButtonAddThread() {
  return (
    <Box sx={{ position: 'fixed', bottom: 30, right: 30 }}>
      <Link to={ADD_NEW_THREAD_PATH}>
        <Button variant="contained">Buat Utas</Button>
      </Link>
    </Box>
  );
}

export default ButtonAddThread;
