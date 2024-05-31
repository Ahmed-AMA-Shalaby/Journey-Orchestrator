module.exports = {
  // this will check Typescript files
  '**/*.(ts|tsx)': () => 'npm run typecheck',

  // This will lint and format TypeScript and JavaScript files
  '**/*.(ts|tsx)': () => [`npm run lint:fix`, `npm run format:fix`],

  // this will Format MarkDown and JSON
  '**/*.(md|json)': () => [`npm run format:fix`],

  // this will run unit tests
  '*.{ts,tsx}': ['npm run test:staged'],
};
