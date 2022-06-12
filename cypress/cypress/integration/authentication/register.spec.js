import { buildUser } from "../../support/generate";

it("user should be able to register successfully", () => {
  const user = buildUser();
  cy.visit("http://localhost:3000/register").viewport(1500, 800);
  cy.request({
    url: "http://localhost:4000/auth/register",
    failOnStatusCode: false,
    method: "POST",
    body: user,
  });
  cy.get("#email").type(user.email);
  cy.get("#password").type(user.password);
  cy.get("#password-confiremed").type(user.password);
  cy.get(".css-c55fb7 > .btn").click();
  cy.get(".btn-pink").click({ mutiple: true });
  cy.get(".css-c55fb7 > :nth-child(3)").click();
});
