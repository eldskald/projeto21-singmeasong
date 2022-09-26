beforeEach(() => {
  cy.request('POST', 'http://localhost:4000/ready-db');
});

it('Should go to random recommendation page', async () => {
  cy.visit('http://localhost:3000/top');
  cy.get('[data-cy="menu-home"]').click();
  cy.url().should('equal', 'http://localhost:3000/');
});