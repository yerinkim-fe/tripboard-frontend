context('Actions', () => {
  beforeEach(function () {
    cy.viewport(375, 667);
  })

  describe('Implicit Assertions', () => {
    it('Sign up', () => {
      cy.visit('https://tripboard.yerinsite.com');
      cy.get('.account a').click();
      cy.get('input[type=email]').type(Cypress.env('newEmail'));
      cy.get('input[type=text]').type(Cypress.env('newName'));
      cy.get('input[type=password]').type(`${Cypress.env('incorrectPassword')}{enter}`);
      cy.get('input[type=password]').clear();
      cy.get('input[type=password]').type(`${Cypress.env('correctPassword')}{enter}`);
    });

    it('Sign in', () => {
      cy.get('input[type=email]').type(Cypress.env('correctEmail'));
      cy.get('input[type=password]').type(`${Cypress.env('incorrectPassword')}{enter}`);
      cy.get('input[type=password]').clear();
      cy.get('input[type=password]').type(`${Cypress.env('correctPassword')}{enter}`);
    });

    it('View trip board list', () => {
      cy.get('.button-list').click();
      cy.get('.trip-list .inner').scrollTo('bottom');
      cy.get('.trip-list .inner').scrollTo('top');
      cy.get('.button-close').click();
    });

    it('View detail of trip list', () => {
      cy.get('.button-list').click();
      cy.get('.trip-list li a').first().click();
      cy.get('.thumbnails li').first().click();
      cy.get('.button-close').click();
      cy.get('.button-back').click();
    });

    it('Add new trip', () => {
      const fileName = 'images/testPicture.jpeg';

      cy.get('.button-plus').click();
      cy.get('input[name=title]').type('add new trip');
      cy.get('input[name=sdate]').type('02/16/2019');
      cy.get('input[name=edate]').focus().type('10/16/2019');
      cy.get('.button-place-search').focus().click();
      cy.get('.auto-complete').type('바르셀로나');
      cy.wait(1000);
      cy.get('.pac-container .pac-item').first().click({force: true});
      cy.get('.auto-complete').type('{downarrow}{enter}')
      cy.get('.button-map-save').click();
      cy.fixture(fileName).then(fileContent => {
        cy.get('input[type=file]').upload({ fileContent, fileName, mimeType: 'image/jpeg' });
      });
      cy.get('.button-upload').click();
      cy.wait(1000);
      cy.get('input[type=submit]').click();
    });

    it('View trip chart', () => {
      cy.get('.button-chart').click();
      cy.scrollTo('bottom');
      cy.scrollTo('top');
      cy.get('.button-back').click();
    });

    it('Sign out', () => {
      cy.get('.button-signout').click();
    });
  });
});
