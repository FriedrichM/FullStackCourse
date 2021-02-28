describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('logged in as Matti Luukkainen')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('falsch')
      cy.get('#login-button').click()
      cy.contains('Wrong credentials')
      cy.get('html').should('not.contain','logged in as Matti Luukkainen')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#titleinput').type('test')
      cy.get('#author').type('someone')
      cy.get('#urlinput').type('internet.com')
      cy.get('.createbtn').click()
      cy.contains('test someone')
    })

    it('A blog can be liked', function() {
      cy.createBlog({ title:'test', author:'someone', url:'internet.com' })
      cy.contains('view').click()
      cy.contains('likes 0')
      cy.get('.likebtn').click()
      cy.contains('likes 1')
    })

    it('A blog can be deleted', function() {
      cy.createBlog({ title:'test', author:'someone', url:'internet.com' })
      cy.contains('view').click()
      cy.contains('test someone')
      cy.contains('remove').click()
      cy.get('html').should('not.contain','test someone')
    })

    it('blogs are sorted by likes', function() {
      cy.createBlog({ title:'blog1', author:'someone', url:'internet.com' })
      cy.createBlog({ title:'blog2', author:'someone', url:'internet.com' })
      cy.createBlog({ title:'blog3', author:'someone', url:'internet.com' })
      cy.contains('blog1').parent().contains('view').click()
      cy.contains('blog2').parent().contains('view').click()
      cy.contains('blog3').parent().contains('view').click()
      cy.contains('blog1').parent().find('.likebtn').click()
      cy.contains('blog3').parent().find('.likebtn').click().click().click()
      cy.contains('blog2').parent().find('.likebtn').click().click().click().click().click().click()
      cy.wait(500)
      let likearray=[]
      cy.get('span')
        .then( span => span.map((i,e) => likearray[i]=Number(e.innerHTML.substring(6))))
        .then( () => expect(likearray.reduce((a,v) => (a!==false) && (a >= v) ? v : false, Infinity)).to.not.equal(false))
    })
  })
})
