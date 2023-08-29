import React from 'react';
import { screen } from '@testing-library/react';
import Leaderboard from '../../components/Leaderboard/Leaderboard';
import { renderWithProviders } from '../reduxTester';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import type { Player } from '../../interfaces/Player';

const mockPlayers: Player[] = [
  {
    username: "complaininclude",
    picture: "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
    score: 4135,
    rank: 1
  },
  {
    username: "provisionkiller",
    picture: "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
    score: 3453,
    rank: 2
  },
  {
    username: "locatefrosty",
    picture: "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
    score: 3263,
    rank: 3
  },
  {
    username: "honkybolognase",
    picture: "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
    score: 3245,
    rank: 4
  },
  {
    username: "smartchoice",
    picture: "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
    score: 2132,
    rank: 5
  }
];

export const handlers = [
  rest.get('/players', (req: any, res, ctx) => {
    // Array slice logic from the back-end
    const page = parseInt(req.url.searchParams.get('page'));
    const limit = parseInt(req.url.searchParams.get('limit'));
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    return res(ctx.json({
      total: 5,
      players: mockPlayers.slice(startIndex, endIndex) // 
    }), ctx.delay());
  })
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

test('fetches and displays players of the first page', async () => {
  renderWithProviders(<Leaderboard />, {
    preloadedState: {
      pagination: {
        currentPage: 1,
        itemsPerPage: 3,
      }
    }
  });

  expect(screen.getByText(/RANK/i)).toBeInTheDocument();
  expect(screen.getByText(/PLAYER/i)).toBeInTheDocument();
  expect(screen.getByText(/SCORE/i)).toBeInTheDocument();

  expect(await screen.findByText(/complaininclude/i)).toBeInTheDocument();
  expect(screen.getByText(/provisionkiller/i)).toBeInTheDocument();
  expect(screen.getByText(/locatefrosty/i)).toBeInTheDocument();

  expect(screen.queryByText(/honkybolognase/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/smartchoice/i)).not.toBeInTheDocument();
})

test('fetches and displays players of the second page', async () => {
  renderWithProviders(<Leaderboard/>, {
    preloadedState: {
      pagination: {
        currentPage: 2,
        itemsPerPage: 3,
      }
    }
  });

  expect(screen.getByText(/RANK/i)).toBeInTheDocument();
  expect(screen.getByText(/PLAYER/i)).toBeInTheDocument();
  expect(screen.getByText(/SCORE/i)).toBeInTheDocument();

  expect(await screen.findByText(/honkybolognase/i)).toBeInTheDocument();
  expect(screen.getByText(/smartchoice/i)).toBeInTheDocument();

  expect(screen.queryByText(/complaininclude/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/provisionkiller/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/locatefrosty/i)).not.toBeInTheDocument();
})