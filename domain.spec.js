/// <reference types="cypress"/>

describe('Test Domain Page', () => {
    beforeEach(() => {
        cy.visit('/')
    })
    const org_name="demo-test"

    it('check input field is focused', () => {
        cy.get('[cydata=cy-org]').should('have.focus')
    })

    it('check oraganization not exists and show error',() => {
        cy.get('[cydata=cy-org]').type('tests')
        cy.get('[cydata=cy-nextBtn]').click()
        cy.get('.ant-message').should('be.visible').and('contain','Organization does not exists')
    })

    it('check for empty field of organization name', () => {
        cy.get('[cydata=cy-org]').clear()
        cy.get('[cydata=cy-nextBtn]').click()
        cy.get('.ant-form-explain').should('be.visible').and('contain','Please enter the Organization')
    })
    
    it('error message disable after type organization name', () => {
        cy.get('[cydata=cy-nextBtn]').click()
        cy.get('[cydata=cy-org]').type('test')
        cy.get('.ant-form-explain').should('not.be.visible')
    })

    it('redirect to login if organization name is corret', () => {
        cy.get('[cydata=cy-org]').type(org_name)
        cy.get('[cydata=cy-nextBtn]').click()
        cy.url().should('include','/login')
        cy.get('.mk-app-login-content-org-value').should('contain',org_name)
        
    })
})