describe('GraphQL API Interception Test', () => {
    it('should intercept and mock a GraphQL login request', () => {
      // Intercept the GraphQL request to login
      cy.intercept('POST', 'http://localhost:4000', (req) => {
        // Check if the request body contains the login query
        if (req.body.operationName === 'Login') {
          req.reply({
            statusCode: 200,
            body: {
              data: {
                login: {
                  id: '123',
                  token: 'mockToken123',
                  refreshToken: 'mockRefreshToken123',
                },
              },
            },
          });
        }
      }).as('graphqlLogin');
  
      // Trigger the GraphQL request (depends on your app setup)
      cy.visit('/login');
      
      // Simulate a login attempt (this would vary depending on your UI)
      cy.get('input[name="username"]').type('user1');
      cy.get('input[name="password"]').type('password');
      cy.get('button[type="submit"]').click();
  
      // Wait for the intercepted GraphQL login request
      cy.wait('@graphqlLogin').then((interception) => {
        // Assertions on the intercepted request
        expect(interception.response?.statusCode).to.eq(200);
        expect(interception.response?.body.data.login.id).to.eq('123');
        expect(interception.response?.body.data.login.token).to.eq('mockToken123');
      });
  
      // Now you can add additional UI checks
      cy.get('.token-display').should('contain', 'mockToken123');
    });
  });
  