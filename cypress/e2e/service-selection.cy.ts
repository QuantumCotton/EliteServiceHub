describe('Service Selection Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should allow users to browse and select services', () => {
    // Check navigation and hero section
    cy.getByTestId('hero-section').should('be.visible');
    cy.getByTestId('services-nav-link').click();
    cy.url().should('include', '/services');

    // Verify service grid is displayed
    cy.getByTestId('service-grid').should('be.visible');
    cy.getByTestId('service-card').should('have.length.at.least', 1);

    // Select a specific service
    cy.selectService('TURF_SERVICE');

    // Verify service details page
    cy.getByTestId('service-title').should('be.visible');
    cy.getByTestId('service-description').should('be.visible');
    cy.getByTestId('contact-form').should('be.visible');
  });

  it('should have proper accessibility attributes', () => {
    // Check main navigation accessibility
    cy.getByTestId('main-nav')
      .should('have.attr', 'role', 'navigation')
      .and('have.attr', 'aria-label');

    // Check service cards accessibility
    cy.visit('/services');
    cy.getByTestId('service-card').each(($card) => {
      cy.wrap($card)
        .should('have.attr', 'role', 'button')
        .and('have.attr', 'aria-label');
    });

    // Run accessibility audit
    cy.checkA11y();
  });

  it('should handle form submission correctly', () => {
    cy.selectService('TURF_SERVICE');
    
    // Fill out contact form
    cy.getByTestId('contact-form').within(() => {
      cy.getByTestId('name-input').type('Test User');
      cy.getByTestId('email-input').type('test@example.com');
      cy.getByTestId('message-input').type('Test message');
      cy.getByTestId('submit-button').click();
    });

    // Verify success message
    cy.getByTestId('success-message')
      .should('be.visible')
      .and('contain', 'Thank you for your message');
  });
});
