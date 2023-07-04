import { Alert, Fade, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { PropTypes, alertShape } from '../utils/globalPropTypes';

function AlertPopup({ alert, customStyleAndPreventAutoHide }) {
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
      autoHideDuration={customStyleAndPreventAutoHide ? null : 3000}
      onClose={handleClose}
      style={
        customStyleAndPreventAutoHide
          ? { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
          : {}
      }
    >
      <Fade in={open}>
        <Alert elevation={6} variant="filled" severity={alert?.type}>
          {alert?.message}
        </Alert>
      </Fade>
    </Snackbar>
  );
}

AlertPopup.propTypes = {
  alert: PropTypes.shape(alertShape),
  customStyleAndPreventAutoHide: PropTypes.bool,
};

AlertPopup.defaultProps = {
  alert: null,
  customStyleAndPreventAutoHide: false,
};

export default AlertPopup;
