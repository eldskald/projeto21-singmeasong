beforeEach(() => {
  cy.request('POST', 'http://localhost:4000/ready-db');
});

it('Should go to top 10 page', async () => {
  cy.visit('http://localhost:3000');
  cy.get('[data-cy="menu-top"]').click();
  cy.url().should('equal', 'http://localhost:3000/top');
});