/**
 * - Login spec
 *  - should display login page correctly
 *  - should display alert when email is empty
 *  - should display alert when password is empty
 *  - should display alert when email and password are wrong
 *  - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login/');
  });

  it('should display login page correctly', () => {
    // verifikasi elemen yang harus tampak pada halaman login
    cy.get('input[type=email]').should('be.visible');
    cy.get('input[type=password]').should('be.visible');
    cy.get('button')
      .contains(/^Masuk$/)
      .should('be.visible');
  });

  it('should display alert when email is empty', () => {
    cy.get('button')
      .contains(/^Masuk$/)
      .click();

    cy.get('div[role=alert]')
      .should('be.visible')
      .and('contain', '"email" is not allowed to be empty');
  });

  it('should display alert when password is empty', () => {
    cy.get('input[type=email]').type('hendarsyah@gmail.com');
    cy.get('button')
      .contains(/^Masuk$/)
      .click();

    cy.get('div[role=alert]')
      .should('be.visible')
      .and('contain', '"password" is not allowed to be empty');
  });

  it('should display alert when email and password is wrong', () => {
    cy.get('input[type=email]').type('hendarsyah@gmail.com');
    cy.get('input[type=password]').type('erutest1234');
    cy.get('button')
      .contains(/^Masuk$/)
      .click();

    cy.get('div[role=alert]').should('be.visible').and('contain', 'email or password is wrong');
  });

  it('should display homepage when email and password are correct', () => {
    cy.get('input[type=email]').type('hendarsyah@gmail.com');
    cy.get('input[type=password]').type('erutest123');
    cy.get('button')
      .contains(/^Masuk$/)
      .click();

    cy.get('[aria-label="User Avatar"]').should('be.visible').click();
    cy.get('li[role=menuitem]').should('be.visible').and('contain', 'Logout');
  });
});
