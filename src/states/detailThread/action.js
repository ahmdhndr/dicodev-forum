import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { voteURL } from '../../utils/Constants';
import api from '../../utils/api';
import { showErrorAlert } from '../alert/action';

const ActionType = {
  RECEIVE_DETAIL_THREAD: 'RECEIVE_DETAIL_THREAD',
  CLEAR_DETAIL_THREAD: 'CLEAR_DETAIL_THREAD',
  UP_VOTE_DETAIL_THREAD: 'UP_VOTE_DETAIL_THREAD',
  DOWN_VOTE_DETAIL_THREAD: 'DOWN_VOTE_DETAIL_THREAD',
  NEUTRAL_VOTE_DETAIL_THREAD: 'NEUTRAL_VOTE_DETAIL_THREAD',
  ADD_COMMENT: 'ADD_COMMENT',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
  NEUTRAL_VOTE_COMMENT: 'NEUTRAL_VOTE_COMMENT',
};

function receiveDetailThreadActionCreator(detailThread) {
  return {
    type: ActionType.RECEIVE_DETAIL_THREAD,
    payload: {
      detailThread,
    },
  };
}

function clearDetailThreadActionCreator() {
  return {
    type: ActionType.CLEAR_DETAIL_THREAD,
  };
}

function upVoteDetailThreadActionCreator(userId) {
  return {
    type: ActionType.UP_VOTE_DETAIL_THREAD,
    payload: {
      userId,
    },
  };
}

function downVoteDetailThreadActionCreator(userId) {
  return {
    type: ActionType.DOWN_VOTE_DETAIL_THREAD,
    payload: {
      userId,
    },
  };
}

function neutralVoteDetailThreadActionCreator(userId) {
  return {
    type: ActionType.NEUTRAL_VOTE_DETAIL_THREAD,
    payload: {
      userId,
    },
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function upVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.UP_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function downVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function neutralVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.NEUTRAL_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncReceiveDetailThread(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());

    dispatch(clearDetailThreadActionCreator());
    try {
      const detailThread = await api.getDetailThread(threadId);
      dispatch(receiveDetailThreadActionCreator(detailThread));
    } catch (error) {
      dispatch(showErrorAlert(error.message));
    }

    dispatch(hideLoading());
  };
}

function asyncUpVoteDetailThread() {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, detailThread } = getState();
    dispatch(upVoteDetailThreadActionCreator(authUser.id));

    try {
      await api.voteThread({ threadId: detailThread.id, url: voteURL.UP_VOTE });
    } catch (error) {
      dispatch(showErrorAlert(error.message));
      dispatch(upVoteDetailThreadActionCreator(authUser.id));
    }

    dispatch(hideLoading());
  };
}

function asyncDownVoteDetailThread() {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, detailThread } = getState();
    dispatch(downVoteDetailThreadActionCreator(authUser.id));

    try {
      await api.voteThread({ threadId: detailThread.id, url: voteURL.DOWN_VOTE });
    } catch (error) {
      dispatch(showErrorAlert(error.message));
      dispatch(downVoteDetailThreadActionCreator(authUser.id));
    }

    dispatch(hideLoading());
  };
}

function asyncNeutralVoteDetailThread() {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, detailThread } = getState();
    dispatch(neutralVoteDetailThreadActionCreator(authUser.id));

    try {
      await api.voteThread({ threadId: detailThread.id, url: voteURL.NEUTRAL_VOTE });
    } catch (error) {
      dispatch(showErrorAlert(error.message));
      dispatch(neutralVoteDetailThreadActionCreator(authUser.id));
    }

    dispatch(hideLoading());
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      dispatch(showErrorAlert(error.message));
    }

    dispatch(hideLoading());
  };
}

function asyncUpVoteComment({ commentId }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, detailThread } = getState();
    dispatch(upVoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      await api.voteComment({ threadId: detailThread.id, commentId, url: voteURL.UP_VOTE });
    } catch (error) {
      dispatch(showErrorAlert(error.message));
      dispatch(upVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }

    dispatch(hideLoading());
  };
}

function asyncDownVoteComment({ commentId }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, detailThread } = getState();
    dispatch(downVoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      await api.voteComment({ threadId: detailThread.id, commentId, url: voteURL.DOWN_VOTE });
    } catch (error) {
      dispatch(showErrorAlert(error.message));
      dispatch(downVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }

    dispatch(hideLoading());
  };
}

function asyncNeutralVoteComment({ commentId }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, detailThread } = getState();
    dispatch(neutralVoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      await api.voteComment({ threadId: detailThread.id, commentId, url: voteURL.NEUTRAL_VOTE });
    } catch (error) {
      dispatch(showErrorAlert(error.message));
      dispatch(neutralVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  addCommentActionCreator,
  asyncAddComment,
  asyncDownVoteComment,
  asyncDownVoteDetailThread,
  asyncNeutralVoteComment,
  asyncNeutralVoteDetailThread,
  asyncReceiveDetailThread,
  asyncUpVoteComment,
  asyncUpVoteDetailThread,
  clearDetailThreadActionCreator,
  downVoteCommentActionCreator,
  downVoteDetailThreadActionCreator,
  neutralVoteCommentActionCreator,
  neutralVoteDetailThreadActionCreator,
  receiveDetailThreadActionCreator,
  upVoteCommentActionCreator,
  upVoteDetailThreadActionCreator,
};
