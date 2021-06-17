import '@4tw/cypress-drag-drop';

describe('test drag ingredients and drop to constructor', () => {
  it('dnd event', () => {
    cy.viewport(1580, 800);
    cy.visit('/');
    cy.wait(777);
    cy.get('[data-cy="dnd_60cb37bc6c007b002732282a"]').drag('[data-cy="dropTarget"]')
    cy.wait(777);
    cy.get('[data-cy="dnd_60cb37bc6c007b0027322826"]').drag('[data-cy="dropTarget"]')
    
  })
})