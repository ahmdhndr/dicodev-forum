import { describe, it, expect } from 'vitest';
import detailThreadReducer from './reducer';

/**
 * test scenarios
 *
 * - detailThreadReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the detailThread when given by RECEIVE_DETAIL_THREAD action
 *  - should return the detailThread with the up voted detailThread
 *    when given by UP_VOTE_DETAIL_THREAD action
 *  - should return the detailThread with the down voted detailThread
 *    when given by UP_VOTE_DETAIL_THREAD action
 *  - should return the detailThread with the neutral voted detailThread
 *    when given by UP_VOTE_DETAIL_THREAD action
 */

describe('detailThreadReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the detailThread when given by RECEIVE_DETAIL_THREAD action', () => {
    // arrange
    const initialState = null;
    const action = {
      type: 'RECEIVE_DETAIL_THREAD',
      payload: {
        detailThread: {
          title: 'Bagaimana pengalamanmu belajar Redux?',
          body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
          category: 'redux',
          comments: [],
          createdAt: '2023-05-29T07:55:52.266Z',
          downVotesBy: [],
          id: 'thread-Np47p4jhUXYhrhRn',
          owner: {
            id: 'user-mQhLzINW_w5TxxYf',
            name: 'Dimas Saputra',
            avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
          },
          upVotesBy: [],
        },
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.detailThread);
  });

  it('should return the detailThread with up voted when given by UP_VOTE_DETAIL_THREAD action', () => {
    const initialState = {
      title: 'Bagaimana pengalamanmu belajar Redux?',
      body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
      category: 'redux',
      comments: [],
      createdAt: '2023-05-29T07:55:52.266Z',
      downVotesBy: [],
      id: 'thread-Np47p4jhUXYhrhRn',
      owner: {
        id: 'user-mQhLzINW_w5TxxYf',
        name: 'Dimas Saputra',
        avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
      },
      upVotesBy: [],
    };
    const action = {
      type: 'UP_VOTE_DETAIL_THREAD',
      payload: {
        userId: 'user-mQhLzINW_w5TxxYf',
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [action.payload.userId],
    });
    expect(nextState.upVotesBy).toHaveLength(1);
  });

  it('should return the detailThread with down voted when given by DOWN_VOTE_DETAIL_THREAD action', () => {
    const initialState = {
      title: 'Bagaimana pengalamanmu belajar Redux?',
      body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
      category: 'redux',
      comments: [],
      createdAt: '2023-05-29T07:55:52.266Z',
      downVotesBy: [],
      id: 'thread-Np47p4jhUXYhrhRn',
      owner: {
        id: 'user-mQhLzINW_w5TxxYf',
        name: 'Dimas Saputra',
        avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
      },
      upVotesBy: [],
    };
    const action = {
      type: 'DOWN_VOTE_DETAIL_THREAD',
      payload: {
        userId: 'user-mQhLzINW_w5TxxYf',
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      downVotesBy: [action.payload.userId],
    });
    expect(nextState.downVotesBy).toHaveLength(1);
  });

  it('should return the detailThread with neutral voted when given by NEUTRAL_VOTE_DETAIL_THREAD action', () => {
    const initialState = {
      title: 'Bagaimana pengalamanmu belajar Redux?',
      body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
      category: 'redux',
      comments: [],
      createdAt: '2023-05-29T07:55:52.266Z',
      downVotesBy: [],
      id: 'thread-Np47p4jhUXYhrhRn',
      owner: {
        id: 'user-mQhLzINW_w5TxxYf',
        name: 'Dimas Saputra',
        avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
      },
      upVotesBy: ['user-mQhLzINW_w5TxxYf'],
    };
    const action = {
      type: 'NEUTRAL_VOTE_DETAIL_THREAD',
      payload: {
        userId: 'user-mQhLzINW_w5TxxYf',
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [],
    });
  });
});
