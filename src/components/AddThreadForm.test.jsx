import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import AddThreadForm from './AddThreadForm';
import store from '../states';

/**
 * test scenarios
 *
 * - AddThreadForm component
 *  - should handle title typing correctly
 *  - should handle body typing correctly
 *  - should call addThreadFn function when addThread button is clicked
 */

expect.extend(matchers);

describe('AddThreadForm component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle title typing correctly', async () => {
    // arrange
    render(
      <Provider store={store}>
        <AddThreadForm addThreadFn={() => {}} />
      </Provider>,
    );
    const titleInput = screen.getByLabelText('Judul');

    // action
    await userEvent.type(titleInput, 'Test judul');

    // assert
    expect(titleInput).toHaveValue('Test judul');
  });

  it('should handle category typing correctly', async () => {
    // arrange
    render(
      <Provider store={store}>
        <AddThreadForm addThreadFn={() => {}} />
      </Provider>,
    );
    const categoryInput = screen.getByLabelText('Kategori');

    // action
    await userEvent.type(categoryInput, 'Test kategori');

    // assert
    expect(categoryInput).toHaveValue('Test kategori');
  });

  it('should handle body typing correctly', async () => {
    // arrange
    render(
      <Provider store={store}>
        <AddThreadForm addThreadFn={() => {}} />
      </Provider>,
    );
    const bodyInput = screen.getByLabelText('Isi Utas');

    // action
    await userEvent.type(bodyInput, 'Test isi body');

    // assert
    expect(bodyInput).toHaveValue('Test isi body');
  });

  it('should call addThreadFn function when addThread button is clicked', async () => {
    // arrange
    const mockAddThread = vi.fn();
    render(
      <Provider store={store}>
        <AddThreadForm addThreadFn={mockAddThread} />
      </Provider>,
    );
    const titleInput = screen.getByLabelText('Judul');
    await userEvent.type(titleInput, 'Test judul');
    const categoryInput = screen.getByLabelText('Kategori');
    await userEvent.type(categoryInput, 'Test kategori');
    const bodyInput = screen.getByLabelText('Isi Utas');
    await userEvent.type(bodyInput, 'Test isi body');
    const addThreadButton = screen.getByRole('button', { name: 'Buat Utas' });

    // action
    await userEvent.click(addThreadButton);

    // assert
    expect(mockAddThread).toBeCalledWith({
      title: 'Test judul',
      category: 'Test kategori',
      body: 'Test isi body',
    });
  });
});
