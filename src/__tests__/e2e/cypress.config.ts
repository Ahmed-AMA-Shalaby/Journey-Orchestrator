import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    specPattern: './cypress/e2e/**/*.cy.ts',
    supportFile: './cypress/support/e2e.ts',
    baseUrl: 'http://localhost:5173',
    screenshotOnRunFailure: false,
    trashAssetsBeforeRuns: false,
    testIsolation: false,
    setupNodeEvents(on) {
      on('task', {
        log(message) {
          // eslint-disable-next-line no-console
          console.log(message);

          return null;
        },
      });
    },
  },
});
