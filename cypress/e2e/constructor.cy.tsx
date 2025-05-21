describe('проверяем доступность приложения', function () {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', (req) => {
      req.reply({
        statusCode: 200,
        fixture: 'ingredients.json'
      });
    });
    cy.visit('http://localhost:5173');
  });

  it('отображаются замоканные товары', () => {
    cy.contains('Краторная булка N-200i');
  });

  it('добавляет булку в конструктор по клику на кнопку "Добавить"', () => {
    cy.get('[data-testid="ingredient-item"]')
      .first()
      .within(() => {
        cy.contains('Добавить').click();
      });
    cy.get('[data-testid="constructor"]').should(
      'contain',
      'Краторная булка N-200i'
    );
  });

  it('добавляет начинку в конструктор по клику на кнопку "Добавить"', () => {
    cy.contains(
      '[data-testid="ingredient-item"]',
      'Биокотлета из марсианской Магнолии'
    ).within(() => {
      cy.contains('Добавить').click();
    });

    cy.get('[data-testid="constructor"]').should(
      'contain',
      'Биокотлета из марсианской Магнолии'
    );
  });

  it('тест работы модальных окон', () => {
    cy.get('[data-testid="ingredient-link"]').first().click();

    cy.get('[data-testid="modal"]').should('exist');

    cy.get('[data-testid="modal-close"]').click();

    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('тест закрытия модалки при клике на оверлей', () => {
    cy.get('[data-testid="ingredient-link"]').first().click();

    cy.get('[data-testid="modal"]').should('exist');

    cy.get('[data-testid="overlay"]').click({ force: true });

    cy.get('[data-testid="modal"]').should('not.exist');
  });
});
