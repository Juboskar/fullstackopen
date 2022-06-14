Cypress.Commands.add('createBlog', (title, author, url) => {
    const user = JSON.parse(localStorage.getItem('loggedBlogAppUser'))
    const authorization = `bearer ${user.token}`
    const options = {
        method: 'POST',
        url: 'http://localhost:3003/api/blogs',
        headers: {
            authorization,
        },
        body: {
            'title': title,
            'author': author,
            'url': url
        }
    };
    cy.request(options)
})