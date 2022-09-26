beforeEach(() => {
  cy.request('POST', 'http://localhost:4000/ready-db');
});

it('Should downvote a song successfully', () => {
  cy.visit('http://localhost:3000');
  cy.intercept('POST', 'http://localhost:4000/recommendations/1/downvote').as('downvote');
  cy.get('[data-cy="rec1-downvote"').click();
  cy.wait('@downvote');
  cy.get('[data-cy="rec1-score"').should('have.text', '17');
});