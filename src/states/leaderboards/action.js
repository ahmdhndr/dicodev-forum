import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { showErrorAlert } from '../alert/action';

const ActionType = {
  RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARDS',
};

function receiveLeaderboardsActionCreator(leaderboards) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
}

function asyncReceiveLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const leaderboards = await api.getLeaderboards();
      dispatch(receiveLeaderboardsActionCreator(leaderboards));
    } catch (error) {
      dispatch(showErrorAlert(error.message));
    }

    dispatch(hideLoading());
  };
}

export { ActionType, receiveLeaderboardsActionCreator, asyncReceiveLeaderboards };
