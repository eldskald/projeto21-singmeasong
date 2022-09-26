beforeEach(() => {
  cy.request('POST', 'http://localhost:4000/ready-db');
});

it('Should upvote a song successfully', () => {
  cy.visit('http://localhost:3000');
  cy.intercept('POST', 'http://localhost:4000/recommendations/1/upvote').as('upvote');
  cy.get('[data-cy="rec1-upvote"').click();
  cy.wait('@upvote');
  cy.get('[data-cy="rec1-score"').should('have.text', '19');
});