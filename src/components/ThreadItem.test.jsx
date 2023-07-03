import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import matchers from '@testing-library/jest-dom/matchers';
import { BrowserRouter } from 'react-router-dom';
import ThreadItem from './ThreadItem';
import store from '../states';

/**
 * test scenarios
 *
 * - ThreadItem component
 *  - should have <div> tag with className .MuiGrid-root.MuiGrid-item
 *    and have an h5 with text "Thread Pertama"
 */

const item = {
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
};

expect.extend(matchers);

describe('ThreadItem component', () => {
  it('should have <div> tag with className .MuiGrid-root.MuiGrid-item and have an h5 with text "Thread Pertama"', () => {
    // arrange
    const { container } = render(
      <BrowserRouter>
        <Provider store={store}>
          <ThreadItem {...item} />
        </Provider>
      </BrowserRouter>,
    );

    // action
    const threadItem = container.querySelector('.MuiGrid-root.MuiGrid-item');

    // assert
    expect(threadItem).toBeInTheDocument();
    expect(threadItem.querySelector('h5')).toHaveTextContent(/Thread Pertama$/);
  });
});
