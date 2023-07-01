import { Close as CloseIcon } from '@mui/icons-material';
import { Alert, Fade, IconButton, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { PropTypes, alertShape } from '../utils/globalPropTypes';

function AlertPopup({ showAlert }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (showAlert !== null) setOpen(true);
  }, [showAlert]);

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
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={showAlert?.type}
        >
          {showAlert?.message}
        </Alert>
      </Fade>
    </Snackbar>
  );
}

AlertPopup.propTypes = {
  showAlert: PropTypes.shape(alertShape),
};

AlertPopup.defaultProps = {
  showAlert: null,
};

export default AlertPopup;
