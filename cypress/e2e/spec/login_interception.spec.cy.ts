describe('GraphQL API Interception Test', () => {
    it('should intercept and mock a GraphQL login request', () => {

      cy.visit('https://pharmastock.x-studio.io');
      cy.intercept('POST', 'https://pharmadev.x-studio.io/graphql', (req) => {
       
        if (req.body.operationName === 'Login') {
          req.reply({
            statusCode: 200,
            body: {
              data: {
                login: {
                  email:'aniket+testAdmin@itobuz.com',
                  password: 'Itobuz#1234'
                },
              },
            },
          });
        }
      }).as('graphqlLogin');
  
     
    });
  });
  