# Real-time Leaderboard

This React project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

## Technical Assessment

You are going to implement the screen following up the design question you had during last interview. There are two parts to this exercise:
A simple WebSocket server runs locally, since we won’t focus on backend, this can be done as simple as possible, you can use https://github.com/websockets/ws or any library you prefer. The players notification message will contains the players info.
A single page application built with React, the app needs to cover the questions mentioned in the design question, the delivery can be a zip file containing source code(as well as all of the project files, including dot files) or a git repository that we can access.

Recap of design question:

Please design a real-time leaderboard page that can show the latest status of a game’s top 10 players in first page, players’ status change will be broadcast to UI as WebSocket messages. 

Your React App should include:

1. React Components.
2. Redux (or context, but better with redux we want check how you managed the redux).
3. Unit test.
4. At least one custom hooks.
5. Add pagination (assume we have more than 100 players and could dynamically config the page size (like 10, 15, 20, 25…players per page)). The notification should works fine if user are not in first page.
6. Add Player avatar Images, so the Player info should contains player name, ranking, scores, avatar.
7. Done by Typescript.
8. Feel free to use MUI, Ant Design or other UI libraries you prefer. Or you could develop from scratch.

## Report

#### 1. React Components.

- App.tsx:\
  Main parent component, when mounted, the Websocket is initialized and stored in the Redux Store.

- Leaderboard.tsx:\
  Stateful component representing a DataTable containing the Players' Rank, Avatar, Username and Score. The UI has been implemented using MUI components.\
  When the component mounts or updates depending on the 'currentPage' and 'itemsPerPage' states from the Redux Store, it fetches the list of Players to be displayed via HTTP request to the Backend.\
  The displayable player are stored in the Redux Store and the HTTP request is Thunked via the Redux Toolkit.
  This component also subscribes to the Websocket message 'playerUpdate' with Socket.IO via a Custom Hook and updates the Leaderboard in Real-time.

- Pagination.tsx:\
  Stateful component representing a Pagination dynamically customizable by setting the items per page. The UI has been implemented using MUI components.\
  This component dispatches the values of the new page and the items per page to the Redux Store.

#### 2. Redux.

- store.ts:\
  The reducers have been created using the Redux Toolkit function 'createSlice' to automatically generate action creators and action types that correspond to the reducers and state.
  The AppDispatcher is exported as 'useAppDispatch' to avoid confusion with Redux 'useDispatch' function.

- paginationSlice.ts:\
  This Slice contains 3 actions: 'setCurrentPage' the related state is shared between the Leaderboard component and the Pagination component.

- playersSlice.ts:\
  The RTK function 'createSlice' to automatically generate action creators and action types that correspond to the reducers and state.

- socketSlice.ts:\
  The RTK function 'createSlice' to automatically generate action creators and action types that correspond to the reducers and state.

#### 3. Unit Tests.

- usePagination():\
  S

#### 4. Custom Hooks.

- usePagination():\
  

- useSocket():\
  S

#### 5. Pagination.

#### 6. Data.

#### 7. Code.

#### 8. User Interface.
