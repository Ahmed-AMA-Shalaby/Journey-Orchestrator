import dayjs from 'dayjs';

describe('template spec', () => {
  it('passes', () => {
    cy.visit('/');

    // Start Mission
    cy.findByRole('button', { name: 'Start Mission' }).click();

    // Try to proceed without filling the form
    cy.findByRole('button', { name: 'Next' }).click();

    cy.findByText('Mission name is required').should('be.visible');
    cy.findByText('Mission destination is required').should('be.visible');
    cy.findByText('Departure date is required').should('be.visible');

    // Fill in the Mission Details step
    cy.findByLabelText('Mission Name').type('Test Mission');
    cy.findByText('Mission name is required').should('not.exist');

    cy.findByLabelText('Destination').click();
    cy.findByText('Mars Alpha-116').click();
    cy.findByText('Mission destination is required').should('not.exist');

    cy.findByLabelText('Departure Date').click();
    cy.findByText(dayjs().date()).click();
    cy.findByText('Departure date is required').should('not.exist');

    cy.findByRole('button', { name: 'Next' }).click();

    // Try to proceed without filling the form
    cy.findByRole('button', { name: 'Create' }).click();

    cy.findByText('Pilot must have at least 10 years of experience').should('be.visible');
    cy.findByText("Engineer's job is required").should('be.visible');

    // Fill in the Crew Details step
    cy.findAllByLabelText('Experience').eq(0).type('10');

    cy.findByText('Pilot must have at least 10 years of experience').should('not.exist');

    cy.findAllByLabelText('Experience').eq(1).type('5');

    cy.findByLabelText('Job').click();
    cy.findByText('Navigation').click();
    cy.findByText("Engineer's job is required").should('not.exist');

    cy.findByLabelText('Age').type('25');
    cy.findByLabelText('Wealth').type('1000000');

    cy.findByText('Create').click();

    // Crew Details Tooltip
    cy.findByTestId('InfoIcon').should('be.visible').click();
    cy.findByText('Pilots: 1').should('be.visible');
    cy.findByText('Engineers: 1').should('be.visible');
    cy.findByText('Passengers: 1').should('be.visible');

    cy.findByText('Today').should('be.visible');

    cy.findByLabelText('Search by mission name').type('Mars');
    cy.findByText('Test Mission').should('not.exist');

    cy.findByLabelText('Search by mission name').clear().type('Test');
    cy.findByText('Test Mission').should('be.visible');

    // Manage Mission
    cy.findByRole('button', { name: 'Manage' }).click();

    cy.findByLabelText('Mission Name').clear().type('Test Mission');

    cy.findByLabelText('Destination').click();
    cy.findByText('Mars Alpha-220').click();

    cy.findByLabelText('Departure Date').click();
    cy.findByText(dayjs().add(1, 'day').date()).click();

    cy.findByRole('button', { name: 'Next' }).click();

    cy.findAllByLabelText('Experience').eq(0).clear().type('10');

    cy.findAllByLabelText('Experience').eq(1).clear().type('5');

    cy.findByRole('button', { name: 'Add Engineer' }).click();
    cy.findAllByLabelText('Job').eq(1).click();
    cy.findAllByText('Navigation').eq(1).click();
    cy.findByText('Two engineers cannot have the same job: Navigation').should('be.visible');
    cy.findAllByLabelText('Job').eq(1).click();
    cy.findByText('Mechanics').click();
    cy.findByText('Two engineers cannot have the same job: Navigation').should('not.exist');

    cy.findByRole('button', { name: 'Add Passenger' }).click();
    cy.findAllByLabelText('Age').eq(1).type('50');
    cy.findAllByLabelText('Wealth').eq(1).type('10000000');

    cy.findByText('Update').click();

    // Terminate Mission
    cy.findByText('in 1 day').should('be.visible');

    cy.findByRole('button', { name: 'Terminate' }).click();
    cy.findByText('Test Mission').should('not.exist');
  });
});
