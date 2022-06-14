describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'testuser',
      name: 'Testi Usersson',
      password: 'testpassword'
    })


    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()
      cy.contains('testuser logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login-button').click()
      cy.contains('wrong credentials')
    })
  })
})

