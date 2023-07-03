import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import matchers from '@testing-library/jest-dom/matchers';
import { BrowserRouter } from 'react-router-dom';
import ThreadsList from './ThreadsList';
import store from '../states';

/**
 * test scenarios
 *
 * - ThreadsList component
 *  - should have <div> tag with className .MuiGrid-root.MuiGrid-container and 2 thread item
 */

const threadList = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    user: {
      id: 'users-1',
      name: 'John Doe',
      avatar: 'https://generated-image-url.jpg',
    },
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
  {
    id: 'thread-2',
    title: 'Thread Kedua',
    body: 'Ini adalah thread kedua',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    user: {
      id: 'users-1',
      name: 'John Doe',
      avatar: 'https://generated-image-url.jpg',
    },
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

expect.extend(matchers);

describe('threadsList component', () => {
  it('should have <div> tag with className .MuiGrid-root.MuiGrid-container and 2 thread item', () => {
    // arrange
    const { container } = render(
      <BrowserRouter>
        <Provider store={store}>
          <ThreadsList threads={threadList} authUser={null} />
        </Provider>
      </BrowserRouter>,
    );

    // action
    const threadsList = container.querySelector('.MuiGrid-root.MuiGrid-container');

    // assert
    expect(threadsList).toBeInTheDocument();
    expect(threadsList.querySelectorAll('.MuiGrid-root.MuiGrid-item')).toHaveLength(2);
  });
});
