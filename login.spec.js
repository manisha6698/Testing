/// <reference types="cypress"/>

describe('Test Login Page', () => {
    beforeEach(() => {
        cy.visit('/#/login')
        
    })
    it('username and password not enter', () => {
        cy.get('[cydata=cy-username]').clear()
        cy.get('[cydata=cy-password]').clear()
        cy.get('[cydata=cy-loginBtn]').click()

        cy.get('.ant-form-explain').should('be.visible').and('contain','Please enter the user name')
        cy.get('.ant-form-explain').should('be.visible').and('contain','Please enter your password')
    })
    it('redirect to dashboard after login success', () => {
        cy.get('.mk-app-login-content-org-value').should('contain','demo-test')
        cy.get('[cydata=cy-username]').type('sysadmin')
        cy.get('[cydata=cy-password]').type('Pa55@word')
        cy.get('[cydata=cy-loginBtn]').click()
        cy.url().should('include','/app-home')
    })
    it('redirect to domain page to change domain name', () => {
        cy.get('.mk-app-login-content-org-link').click()
        cy.url('include','get-domain')
    })
    it('username and password are incorrect', () => {
        cy.get('[cydata=cy-username]').type('testid')
        cy.get('[cydata=cy-password]').type('12345678')
        cy.get('[cydata=cy-loginBtn]').click()
        cy.get('.ant-message').should('be.visible').and('contain','Username or password is invalid.')
    })
    
    it('redirect to forgot password page', () => {
        cy.contains('Forgot Password').click()
       // cy.get('.mk-app-login-content-form-forget').should('contain','Forgot Password').click()
        cy.url().should('include','/forgot-password')
        
    })
    
})