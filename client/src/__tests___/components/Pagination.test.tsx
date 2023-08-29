import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import Pagination from '../../components/Pagination/Pagination';
import { renderWithProviders } from '../reduxTester';

test('displays only one clickable page', async () => {
  renderWithProviders(<Pagination />);

  expect(screen.getAllByText(/Players per page/i)[0]).toBeVisible();
  expect(screen.getByText(/Total Players/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'page 1' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Go to page 2' })).not.toBeInTheDocument();
})

test('displays two clickable pages', async () => {
  renderWithProviders(<Pagination />, {
    preloadedState: {
      pagination: {
        totalPages: 2,
        currentPage: 1,
        itemsPerPage: 10,
      }
    }
  });

  expect(screen.getAllByText(/Players per page/i)[0]).toBeVisible();
  expect(screen.getByText(/Total Players/i)).toBeInTheDocument();

  expect(screen.getByRole('button', { name: 'page 1' })).toBeInTheDocument(); // Current page
  expect(screen.getByRole('button', { name: 'Go to page 2' })).toBeInTheDocument(); // Clickable page
})

test('changes the current page', async () => {
  renderWithProviders(<Pagination />, {
    preloadedState: {
      pagination: {
        totalPages: 2,
        currentPage: 1,
        itemsPerPage: 10,
      }
    }
  });

  expect(screen.getAllByText(/Players per page/i)[0]).toBeVisible();
  expect(screen.getByText(/Total Players/i)).toBeInTheDocument();

  expect(screen.getByRole('button', { name: 'page 1' })).toBeInTheDocument(); // Current page

  fireEvent.click(screen.getByRole('button', { name: 'Go to page 2' })); 

  expect(screen.queryByRole('button', { name: 'page 1' })).not.toBeInTheDocument(); // Old current page
  expect(screen.getByRole('button', { name: 'page 2' })).toBeInTheDocument(); // New current page
  expect(screen.getByRole('button', { name: 'Go to page 1' })).toBeInTheDocument(); // New clickable page
})