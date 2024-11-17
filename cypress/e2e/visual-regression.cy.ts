describe('Visual Regression Tests', () => {
  it('should match homepage visual snapshot', () => {
    cy.visit('/');
    cy.wait(1000); // Wait for animations
    cy.percySnapshot('Homepage');
  });

  it('should match services page visual snapshot', () => {
    cy.visit('/services');
    cy.wait(1000);
    cy.percySnapshot('Services Page');
  });

  it('should match service details visual snapshot', () => {
    cy.selectService('TURF_SERVICE');
    cy.wait(1000);
    cy.percySnapshot('Service Details Page');
  });

  it('should match form submission success state', () => {
    cy.selectService('TURF_SERVICE');
    cy.getByTestId('contact-form').within(() => {
      cy.getByTestId('name-input').type('Test User');
      cy.getByTestId('email-input').type('test@example.com');
      cy.getByTestId('message-input').type('Test message');
      cy.getByTestId('submit-button').click();
    });
    cy.wait(1000);
    cy.percySnapshot('Form Submission Success');
  });

  it('should match dark mode visual snapshot', () => {
    cy.visit('/');
    cy.getByTestId('theme-toggle').click();
    cy.wait(1000);
    cy.percySnapshot('Homepage Dark Mode');
  });
});
