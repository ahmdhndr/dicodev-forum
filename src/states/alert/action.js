const AlertTypes = {
  SUCCESS: 'success',
  ERROR: 'error',
};

const ActionType = {
  SHOW_ALERT: 'SHOW_ALERT',
  CLOSE_ALERT: 'SHOW_ALERT',
};

function showSuccessAlert(message) {
  return {
    type: ActionType.SHOW_ALERT,
    payload: {
      message,
      type: AlertTypes.SUCCESS,
    },
  };
}

function showErrorAlert(message = '') {
  return {
    type: ActionType.SHOW_ALERT,
    payload: {
      message,
      type: AlertTypes.ERROR,
    },
  };
}

export { ActionType, AlertTypes, showSuccessAlert, showErrorAlert };
