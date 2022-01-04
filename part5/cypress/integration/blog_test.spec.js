
describe('Blog app', function(){
    beforeEach(function(){
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            username: "tester", 
            name: 'tester',
            password: "1234"
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.visit('http://localhost:3000')
    })

    it('login form is shown', function(){
        cy.get('#username')
        cy.get('#password')
    })

    it('login is successfull', function(){
        cy.get('#username').type('tester')
        cy.get('#password').type('1234')
        cy.get('#login').click()
        cy.contains('tester logged in')
    })
    
    it('login is unsucessful', function(){
        cy.get('#username').type('unknownUser')
        cy.get('#password').type('unknown')
        cy.get('#login').click()
        cy.contains('wrong credentials')
    })

    describe('user log in and create a blog', function(){
        // bypass UI for faster login
        // Localstorage saves item as DomStrings, so we need to use JSON.stringify to convert js obj to string
        beforeEach(function(){
            const user = {
                username: "tester",
                password: "1234"
            }
            cy.request('POST', 'http://localhost:3003/api/login', user)
            .then(response => {
                localStorage.setItem('loggedUser', JSON.stringify(response.body))
            })
            cy.visit('http://localhost:3000')
        })

        // come back to https://fullstackopen.com/en/part5/end_to_end_testing#exercises-5-17-5-22 and do other problems
        // also reread changing of importance of note and debugging test
        it('a new note can be created', function(){
            cy.contains('create new blog').click()
            cy.get('#title').type('hello world')
            cy.get('#author').type('tester')
            cy.get('#url').type('unknown link')
            cy.get('#createBlog').click()
        })
    })
})