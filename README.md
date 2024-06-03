# [Journey Orchestrator](https://journey-orchestrator-aamas.vercel.app/) 🚀🧑‍🚀

Journey Orchestrator is a web application for managing space missions and crew members. The application allows users to create, edit, and manage missions, as well as add and manage crew members. The main page provides a missions table with search, sort, and management functionalities.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)

## Features

- **Missions Page**:
  - Display a table of missions with columns for name, destination, crew members count (by type), departure date (with state of departure/remaining time).
  - Search missions by name.
  - Manage missions (edit, start, terminate).
  - Provide feedback to users upon deletion of missions using snackbars.
- **Mission Management**:
  - Create and edit missions using a stepper with validations.
  - Add and manage crew members for missions.
  - Provide feedback to users upon creation or update of missions using snackbars.

## Technologies Used

<div align="center">
    <a href="https://nodejs.org/" target="_blank"><img src="https://img.icons8.com/color/48/000000/nodejs.png" alt="Next.js Logo" width="50" height="50"></a>
    <a href="https://vitejs.dev/" target="_blank"><img src="https://img.icons8.com/fluency/48/000000/vite.png" alt="MongoDB Atlas Logo" width="50" height="50"></a>
    <a href="https://www.typescriptlang.org/" target="_blank"><img src="https://www.typescriptlang.org/favicon.ico" alt="Typescript Logo" width="50" height="50"></a>
    <a href="https://eslint.org/" target="_blank"><img src="https://eslint.org/favicon.ico" alt="ESlint Logo" width="50" height="50"></a>
    <a href="https://prettier.io/" target="_blank"><img src="https://prettier.io/icon.png" alt="ESlint Logo" width="50" height="50"></a>
    <a href="https://mui.com/" target="_blank"><img src="https://img.icons8.com/color/48/000000/material-ui.png" alt="Mongoose ODM Logo" width="50" height="50"></a>
    <a href="https://vitest.dev/" target="_blank"><img src="https://vitest.dev/favicon.ico" alt="ESlint Logo" width="50" height="50"></a>
    <a href="https://www.cypress.io/" target="_blank"><img src="https://www.cypress.io/favicon.ico" alt="Cloudinary Logo" width="50" height="50"></a>
    <a href="https://github.com/" target="_blank"><img src="https://img.icons8.com/fluency/48/000000/github.png" alt="Vercel Logo" width="50" height="50"></a>
    <a href="https://vercel.com/" target="_blank"><img src="https://vercel.com/favicon.ico" alt="Vercel Logo" width="50" height="50"></a>
</div>

- **Node.js**: v20.x.x
- **Frontend Framework**: Vite
- **Language**: Typescript
- **Linting**: ESLint
- **Formatting**: Prettier
- **Component Library**: MUI v5
- **Unit Testing**: Vitest
- **End-to-End Testing**: Cypress
- **CI Pipeline**: GitHub Actions
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js v20.x.x
- npm (comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ahmed-AMA-Shalaby/journey-orchestrator.git

   cd journey-orchestrator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173`.

### Running Tests

- **Unit Tests** (using Vitest):

  ```bash
  npm run test
  ```

- **End-to-End Tests** (using Cypress):
  ```bash
  npm run e2e
  ```

### Continuous Integration

- The CI pipeline is set up using GitHub Actions.
- It runs unit tests, end-to-end tests, checks TypeScript, code quality (ESLint and Prettier), and builds the application on each push to the repository.

### Continuous Deployment

- The application is deployed on Vercel. Any push to the main branch triggers a deployment.

## Usage

### Missions Page

- **Search**: Use the search bar to find missions by name.
- **Table Columns**:
  - **Name**: The name of the mission.
  - **Destination**: The destination of the mission.
  - **Crew Members Count**: The count of crew members by type.
  - **Departure Date**: The scheduled departure date of the mission with the state of departure/remaining time integrated.
  - **Actions**: Modify or terminate each mission.

### Mission Management

- **Create and Edit Mission**: Use the stepper form to create a new mission or edit an existing one. The form includes validations for required fields.
- **Manage Mission**: Add and manage mission details for missions as part of the mission creation and editing process.
- **Crew Management**: Add and manage crew members for missions as part of the mission creation and editing process.
