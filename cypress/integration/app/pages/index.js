const baseUrl = Cypress.config().baseUrl;

describe('Index page', () => {
  /*
  * Visits the page before each test
  */
  beforeEach(() => {
    cy.visit('/');
  });

  /**
   * Navbar section
   */
  it('should have a navigation bar', () => {
    cy.get('header.MuiAppBar-root').should('have.length', 1);
    cy.get('header.MuiAppBar-root button[title="Refresh"]').should('have.length', 1);
    cy.get('header.MuiAppBar-root button[title="Profile"]').should('have.length', 1);
  });

  /**
   * Main default section
   */
  it('should have a list view', () => {
    cy.get('main .list-page').should('have.length', 1);
  });
});
