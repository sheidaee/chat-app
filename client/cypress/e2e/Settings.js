describe('Chat app - settings page', () => {
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
      .findByTestId('/settings')
      .click()
      .findByText('Dark')
      .click();
    // .type('Hello!')
    // .findByTestId('sendMessageBtn')
    // .findByTestId('message')
    // .type('What is your name?')
    // .findByTestId('sendMessageBtn')
    // .click();
  });
});
