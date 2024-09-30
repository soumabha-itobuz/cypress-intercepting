import {} from 'cypress';

describe('Image Request Interception', () => {
    it('Intercept body', () => {
        
      // Intercept the request
      cy.intercept('GET', 'http://localhost:4000', {
        body: []
      }).as('posts');
  
      // Visit the page
      cy.visit('https://jsonplaceholder.typicode.com/posts');
      cy.wait('posts').its('response.statusCode').should('not.eq',200);
      
    });
  });

