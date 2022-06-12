it("user should login sucessfully", () => {
  cy.visit("http://localhost:3000/login").viewport(1500, 660);

  cy.get("#email-input").type("test@test.com");
  cy.get("#password-input").type("211212");
  cy.get(".css-1diyz6t > .btn").click();
  cy.url().should("eq", "http://localhost:3000/findjobs");
});
