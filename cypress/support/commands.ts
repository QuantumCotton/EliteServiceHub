import '@testing-library/cypress/add-commands';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-testid attribute.
       * @example cy.getByTestId('greeting')
       */
      getByTestId(value: string): Chainable<JQuery<HTMLElement>>;
      
      /**
       * Custom command to verify accessibility violations
       * @example cy.checkA11y()
       */
      checkA11y(
        context?: string | Node,
        options?: any
      ): Chainable<null>;

      /**
       * Custom command to login with email and password
       * @example cy.login('test@example.com', 'password123')
       */
      login(email: string, password: string): Chainable<null>;

      /**
       * Custom command to select a service by type
       * @example cy.selectService('TURF_SERVICE')
       */
      selectService(type: string): Chainable<null>;
    }
  }
}

// Custom command implementation
Cypress.Commands.add('getByTestId', (selector) => {
  return cy.get(`[data-testid="${selector}"]`);
});

Cypress.Commands.add('checkA11y', (context, options) => {
  cy.injectAxe();
  return cy.checkA11y(context, options);
});

Cypress.Commands.add('login', (email, password) => {
  cy.session([email, password], () => {
    cy.visit('/login');
    cy.get('[data-testid="email-input"]').type(email);
    cy.get('[data-testid="password-input"]').type(password);
    cy.get('[data-testid="login-button"]').click();
    cy.url().should('not.include', '/login');
  });
});

Cypress.Commands.add('selectService', (type) => {
  cy.visit('/services');
  cy.getByTestId(`service-${type.toLowerCase()}`).click();
  cy.url().should('include', `/services/${type.toLowerCase()}`);
});
