beforeEach(async () => {
  await cy.request('POST', 'http://localhost:4000/empty-db')
});

it('Should post a song successfully.', async () => {
  cy.visit('http://localhost:3000');
  cy.intercept('POST', 'http://localhost:4000/recommendations').as('sendPost');
  cy.get('[data-cy="name"]').type('sleepmakeswaves = Cascades');
  cy.get('[data-cy="link"]').type('https://youtu.be/LluWlHGvE2w');
  cy.get('[data-cy="post"]').click();
  cy.wait('@sendPost');
  cy.contains('sleepmakeswaves = Cascades').should('be.visible');
});