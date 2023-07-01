import { Button, Container, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { HOME_PATH } from '../utils/Constants';

function NotFoundPage() {
  return (
    <Container
      component="section"
      maxWidth="sm"
      sx={{
        textAlign: 'center',
        marginTop: 5,
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 1 }}>
        Ups! Halaman tersebut tidak ditemukan.
      </Typography>
      <Button variant="contained">
        <Link to={HOME_PATH} style={{ color: '#fff' }}>
          Kembali
        </Link>
      </Button>
    </Container>
  );
}

export default NotFoundPage;
