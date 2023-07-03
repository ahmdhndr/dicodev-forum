import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { asyncAddThread, addThreadActionCreator } from './action';
import { showErrorAlert } from '../alert/action';
import api from '../../utils/api';

/**
 * test scenarios
 *
 * - asyncAddThread thunk
 *  - should dispatch action and call showErrorAlert correctly when
 *    add thread with empty title or body columns
 *  - should dispatch action correctly when the title and body columns are met
 */

// const fakeAddThreadResponse = {
//   id: 'thread-1',
//   title: 'Thread Pertama',
//   body: 'Ini adalah thread pertama',
//   category: 'General',
//   createdAt: '2021-06-21T07:00:00.000Z',
//   ownerId: 'users-1',
//   upVotesBy: [],
//   downVotesBy: [],
//   totalComments: 0,
// };

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncAddThread thunk', () => {
  beforeEach(() => {
    api._createThread = api.createThread;
  });

  afterEach(() => {
    api.createThread = api._createThread;

    delete api._createThread;
  });

  it('should dispatch action and call showErrorAlert correctly when add thread with empty title or body column', async () => {
    // arrange
    const emptyAddThread = {
      title: '',
      category: 'General',
      body: '',
    };
    // stub implementation
    api.createThread = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();

    // action
    await asyncAddThread(emptyAddThread)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(showErrorAlert(fakeErrorResponse.message));
    // expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when the title and body columns are met', async () => {
    // arrange
    const fakeAddThread = {
      title: 'Title test',
      category: 'General',
      body: 'Body test',
    };
    // stub implementation
    api.createThread = () => Promise.resolve(fakeAddThread);
    const dispatch = vi.fn();

    // action
    await asyncAddThread(fakeAddThread)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeAddThread));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
