import '@4tw/cypress-drag-drop';

describe('test drag ingredients and drop to the constructor', () => {
  it('dnd event', () => {
    cy.viewport(1580, 800);
    cy.visit('/');
    cy.wait(777);
    cy.get('[data-cy="dnd_00"]').drag('[data-cy="dropTarget"]')
    cy.wait(777);
    cy.get('[data-cy="dnd_12"]').drag('[data-cy="dropTarget"]')
    cy.wait(777);
    cy.get('[data-cy="dnd_20"]').drag('[data-cy="dropTarget"]')
    cy.wait(777);
    cy.get('[data-cy="dnd_01"]').drag('[data-cy="dropTarget"]')
    cy.wait(777);
    cy.get('[data-cy="dnd_23"]').drag('[data-cy="dropTarget"]')
    
  })
})