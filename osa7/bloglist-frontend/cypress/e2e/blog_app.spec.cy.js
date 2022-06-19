describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'testuser',
      name: 'Testi Usersson',
      password: 'testpassword',
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
      cy.contains('Testi Usersson logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login-button').click()
      cy.contains('wrong credentials')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'testuser',
        password: 'testpassword',
      }).then(({ body }) => {
        localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function () {
      cy.get('#showCreateForm').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('www.example.com/testurl')
      cy.get('#createButton').click()
      cy.contains('a new blog test title by test author added')
    })

    it('A blog can be liked', function () {
      cy.createBlog('abc', 'def', 'www', 0)
      cy.get('#viewButton').click()
      cy.get('#likeButton').click()
      cy.get('#likeButton').click()
      cy.contains('2 likes')
    })

    it('A blog can be deleted', function () {
      cy.createBlog('abc', 'def', 'www', 0)
      cy.get('#viewButton').click()
      cy.get('#removeButton').click()
      cy.on('window:confirm', () => true)
      cy.get('abc').should('not.exist')
    })

    it('Blogs are sorted by likes', function () {
      cy.createBlog('abc1', 'def', 'www', 5)
      cy.createBlog('abc2', 'def', 'www', 0)
      cy.createBlog('abc3', 'def', 'www', 12)
      cy.get('.blog').eq(0).should('contain', 'abc3')
      cy.get('.blog').eq(1).should('contain', 'abc1')
      cy.get('.blog').eq(2).should('contain', 'abc2')
    })
  })
})
