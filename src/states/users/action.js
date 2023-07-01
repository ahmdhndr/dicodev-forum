import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { showErrorAlert } from '../alert/action';
import { asyncSetAuthUser } from '../authUser/action';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      await api.register({ name, email, password });
      dispatch(asyncSetAuthUser({ email, password }));
    } catch (error) {
      dispatch(showErrorAlert(error.message));
    }

    dispatch(hideLoading());
  };
}

export { ActionType, receiveUsersActionCreator, asyncRegisterUser };
