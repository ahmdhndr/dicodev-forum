import { ActionType } from './action';

function alertReducer(alert = null, action = {}) {
  switch (action.type) {
    case ActionType.SHOW_ALERT:
      return action.payload;
    default:
      return alert;
  }
}

export default alertReducer;
