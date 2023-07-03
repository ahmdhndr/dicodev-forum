import { Close as CloseIcon } from '@mui/icons-material';
import { Alert, Fade, IconButton, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { PropTypes, alertShape } from '../utils/globalPropTypes';

function AlertPopup({ alert }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (alert !== null) setOpen(true);
  }, [alert]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Fade in={open}>
        <Alert
          action={
            <IconButton aria-label="close" color="inherit" size="small" onClick={handleClose}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={alert?.type}
        >
          {alert?.message}
        </Alert>
      </Fade>
    </Snackbar>
  );
}

AlertPopup.propTypes = {
  alert: PropTypes.shape(alertShape),
};

AlertPopup.defaultProps = {
  alert: null,
};

export default AlertPopup;
