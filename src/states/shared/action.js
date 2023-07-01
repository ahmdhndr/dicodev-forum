import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { showErrorAlert } from '../alert/action';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      dispatch(showErrorAlert(error.message));
    }

    dispatch(hideLoading());
  };
}

export { asyncPopulateUsersAndThreads };