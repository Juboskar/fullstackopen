Cypress.Commands.add("createBlog", (title, author, url, likes) => {
  const user = JSON.parse(localStorage.getItem("loggedBlogAppUser"));
  const authorization = `bearer ${user.token}`;
  const options = {
    method: "POST",
    url: "http://localhost:3003/api/blogs",
    headers: {
      authorization,
    },
    body: {
      title: title,
      author: author,
      url: url,
      likes: likes,
    },
  };
  cy.request(options);
  cy.visit("http://localhost:3000");
});
