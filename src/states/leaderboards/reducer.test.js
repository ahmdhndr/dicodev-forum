import { describe, it, expect } from 'vitest';
import leaderboardsReducer from './reducer';
import { ActionType } from './action';

/**
 * test scenarios
 *
 * - leaderboardsReducer
 *  - should return the initial state when given by unknown action
 *  - should return the leaderboards state when given by RECEIVE_LEADERBOARDS action
 */

describe('leaderboardsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = leaderboardsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the leaderboards state when given by RECEIVE_LEADERBOARDS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_LEADERBOARDS,
      payload: {
        leaderboards: [
          {
            user: {
              id: 'user-mQhLzINW_w5TxxYf',
              name: 'Dimas Saputra',
              email: 'dimas@dicoding.com',
              avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
            },
            score: 25,
          },
          {
            user: {
              id: 'user-aROWej8yYA1sOfHN',
              name: 'Dicoding',
              email: 'admin@dicoding.com',
              avatar: 'https://ui-avatars.com/api/?name=Dicoding&background=random',
            },
            score: 0,
          },
        ],
      },
    };

    // action
    const nextState = leaderboardsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.leaderboards);
    expect(nextState).toHaveLength(2);
  });
});
