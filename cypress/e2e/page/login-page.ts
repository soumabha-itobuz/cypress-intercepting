export class LoginPage {

    private email = '[name="username"]';
    private password = '[name="password"]';
    private submitButton = "button[type='submit']";

    public launchApp(){
        cy.visit(
            "http://localhost:4000"
            // "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
          );
    }

    public login(){
        console.log(Cypress.env());
        cy.get(this.email).clear().type('Admin');
        cy.get(this.password).clear().type('admin123');
        cy.get(this.submitButton).click();
    }
    
}