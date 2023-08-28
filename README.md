# Getting Started with Create React App

This server was created with Express.js, it integrates Socket.IO and node-cron features.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the server in the development mode.

## Learn More

This server serves HTTP requests and WebSocket events on the same port.
The API allows the client application to get the list of players contained in a static Json database.
The WebSocket allows the client the subscribe to broadcasted events and update the user interface in real-time.

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