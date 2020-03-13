describe('Chat app - send message', () => {
  let user;

  beforeEach(() => {
    return cy
      .createNewUser()
      .then(u => (user = u))
      .visit('/');
  });

  it('can visit the app and send message', () => {
    cy.visit('/')
      .findByTestId('user')
      .type(user.username)
      .findByTestId('signInBtn')
      .click()
      .findByTestId('message')
      .type('Hello!')
      .findByTestId('sendMessageBtn')
      .click()
      .findByTestId('message')
      .type('What is your name?')
      .findByTestId('sendMessageBtn')
      .click();
  });
});
