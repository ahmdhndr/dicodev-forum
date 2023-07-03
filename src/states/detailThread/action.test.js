import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  clearDetailThreadActionCreator,
  asyncReceiveDetailThread,
  receiveDetailThreadActionCreator,
  asyncAddComment,
  addCommentActionCreator,
} from './action';
import { showErrorAlert } from '../alert/action';

/**
 * test scenarios
 *
 * - asyncReceiveDetailThread thunk
 *  - should dispatch action and call showErrorAlert correctly when fetching data
 *    with not founded threadId
 *  - should dispatch action correctly
 *    when data fetching with correct threadId
 *
 * - asyncAddComment thunk
 *  - should dispatch action and call showErrorAlert correctly when add comment with empty content
 *  - should dispatch action correctly when add comment with content
 */

const fakeDetailThread = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  owner: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [],
};

const fakeErrorResponse = new Error('Ups, something went wrong!');

describe('detailThread states', () => {
  beforeEach(() => {
    api._createComment = api.createComment;
    api._getDetailThread = api.getDetailThread;
  });

  afterEach(() => {
    api.createComment = api._createComment;
    api.getDetailThread = api._getDetailThread;

    // delete backup data
    delete api._createComment;
    delete api._getDetailThread;
  });

  describe('asyncReceiveDetailThread thunk', () => {
    it('should dispatch action and call showErrorAlert correctly when fetching data with not founded threadId', async () => {
      // arrange
      const fakeThreadId = 'thread-xxx';
      api.getDetailThread = () => Promise.reject(fakeErrorResponse);
      // mock dispatch
      const dispatch = vi.fn();
      // action
      await asyncReceiveDetailThread(fakeThreadId)(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(clearDetailThreadActionCreator());
      expect(dispatch).toHaveBeenCalledWith(showErrorAlert(fakeErrorResponse.message));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should dispatch action correctly when data fetching with correct threadId', async () => {
      // arrange
      api.getDetailThread = () => Promise.resolve(fakeDetailThread);
      // mock dispatch
      const dispatch = vi.fn();
      // action
      await asyncReceiveDetailThread(fakeDetailThread.id)(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(clearDetailThreadActionCreator());
      expect(dispatch).toHaveBeenCalledWith(receiveDetailThreadActionCreator(fakeDetailThread));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe('asyncAddComment thunk', () => {
    it('should dispatch action and call showErrorAlert correctly when add comment with empty content', async () => {
      // arrange
      // stub implementation
      api.getDetailThread = () => Promise.resolve(fakeDetailThread);
      api.createComment = () => Promise.reject(fakeErrorResponse);
      // mock dispatch
      const dispatch = vi.fn();

      // action
      await asyncReceiveDetailThread(fakeDetailThread.id)(dispatch);
      await asyncAddComment(fakeDetailThread.id)(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(clearDetailThreadActionCreator());
      expect(dispatch).toHaveBeenCalledWith(receiveDetailThreadActionCreator(fakeDetailThread));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(showErrorAlert(fakeErrorResponse.message));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should dispatch action correctly when add comment with content', async () => {
      // arrange
      const fakeComment = {
        threadId: fakeDetailThread.id,
        content: 'some comment',
      };
      // stub implementation
      api.getDetailThread = () => Promise.resolve(fakeDetailThread);
      api.createComment = () => Promise.resolve(fakeComment);
      // mock dispatch
      const dispatch = vi.fn();

      // action
      await asyncReceiveDetailThread(fakeDetailThread.id)(dispatch);
      await asyncAddComment(fakeComment)(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(clearDetailThreadActionCreator());
      expect(dispatch).toHaveBeenCalledWith(receiveDetailThreadActionCreator(fakeDetailThread));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(addCommentActionCreator(fakeComment));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });
});
