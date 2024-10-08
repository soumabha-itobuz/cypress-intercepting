import {} from 'cypress';

describe('Image Request Interception', () => {
  it('Intercept and log fetched data', () => {
    
    // Intercept the request
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/todos/1', (req) => {
      // Handle the response after the request is made
      req.reply((res) => {
        console.log('Fetched data:', res.body);
        
        res.body.id = 4;
        res.body.completed = true;
        // res.body = [];
        cy.log(res.body);
        
      });
    });
    cy.visit('https://jsonplaceholder.typicode.com/');
    cy.get('#run-button').click();
    // cy.wait('@posts').its('response.body').should('have.length', 0); 
  });
});
