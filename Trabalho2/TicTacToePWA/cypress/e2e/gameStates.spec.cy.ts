describe('TicTacToe', () => {
  describe('Winners', () => {
    beforeEach(() => {
      cy.visit('http://localhost:4200');
      cy.viewport(1920, 1080);
      cy.get('[data-cy="new-game-button"]').click();
      cy.get('[data-cy="versus-button"]').click();
    });

    it('should show that X has won', () => {
      cy.get('[data-cy="button-1"]').click();
      cy.get('[data-cy="button-2"]').click();
      cy.get('[data-cy="button-3"]').click();
      cy.get('[data-cy="button-4"]').click();
      cy.get('[data-cy="button-5"]').click();
      cy.get('[data-cy="button-6"]').click();
      cy.get('[data-cy="button-7"]').click();
      cy.get('[data-cy="win-description"]').contains('Player X won the game!');
    });

    it('should show that O has won', () => {
      cy.get('[data-cy="button-1"]').click();
      cy.get('[data-cy="button-2"]').click();
      cy.get('[data-cy="button-3"]').click();
      cy.get('[data-cy="button-5"]').click();
      cy.get('[data-cy="button-9"]').click();
      cy.get('[data-cy="button-8"]').click();
      cy.get('[data-cy="win-description"]').contains('Player O won the game!');
    });

    it('should show no winner (for tie)', () => {
      cy.get('[data-cy="button-4"]').click();
      cy.get('[data-cy="button-5"]').click();
      cy.get('[data-cy="button-2"]').click();
      cy.get('[data-cy="button-1"]').click();
      cy.get('[data-cy="button-7"]').click();
      cy.get('[data-cy="button-3"]').click();
      cy.get('[data-cy="button-6"]').click();
      cy.get('[data-cy="button-8"]').click();
      cy.get('[data-cy="button-9"]').click();
      cy.get('[data-cy="win-description"]').should('not.exist');
    });
  });
});
