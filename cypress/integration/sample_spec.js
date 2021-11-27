/// <reference types="Cypress" />

describe('My First Test', () => {
    it('search replace "type"', () => {
        cy.visit('https://wisehackermonkey.github.io/text-processor-react/')

        cy.get('.view-lines').click({ force: true }).type(`test\ntest`)
        cy.get('[value="multi_newline"]').click({ force: true })

        cy.get(':nth-child(2) > :nth-child(3) > :nth-child(2) > .MuiInput-root > #outlined-multiline-static').click({ force: true }).type("###")
        cy.get(':nth-child(2) > :nth-child(1) > .MuiButton-root').click({ force: true })
        cy.get('.view-line').should(($div) => {
            expect($div.get(0).innerText).to.contain(`test###test`)
        })
    })

    it('generates text', () => {
        cy.visit("http://localhost:3000")
        cy.get(':nth-child(7) > .css-1p5q5e5-MuiStack-root > :nth-child(3) > :nth-child(1) > .MuiInput-root > #outlined-multiline-static').should($div => {
            expect($div.get(0).innerHTML).to.contain("")
        })
        cy.get('[value="int"]').click()
        cy.get(':nth-child(7) > .css-1p5q5e5-MuiStack-root > :nth-child(3) > :nth-child(1) > .MuiInput-root > #outlined-multiline-static').should($div => {
            expect($div.get(0).innerHTML).to.contain("/([0-9]{1,7})/g")
        })

        cy.get(':nth-child(7) > .css-1p5q5e5-MuiStack-root > :nth-child(3) > :nth-child(2) > .MuiInput-root > #outlined-multiline-static').should($div => {
            expect($div.get(0).innerHTML).to.contain("")
        })
        cy.get(':nth-child(7) > .css-1p5q5e5-MuiStack-root > :nth-child(1) > :nth-child(1)').click()
        cy.get(':nth-child(7) > .css-1p5q5e5-MuiStack-root > :nth-child(3) > :nth-child(2) > .MuiInput-root > #outlined-multiline-static').should($div => {
            expect($div.get(0).innerHTML.match(/([0-9]{1,7})/g).length >= 1).to.eq(true)
        })

        cy.get('.css-1p5q5e5-MuiStack-root > :nth-child(1) > :nth-child(2)').click()
        cy.get('.view-line').should(($div) => {
            expect($div.get(0).innerText.match(/([0-9]{1,7})/g).length >= 1).to.eq(true)
        })
        cy.get('.css-1p5q5e5-MuiStack-root > .MuiToggleButtonGroup-root > [value="clear"]').click()

    });

    it('build regex', () => {
        cy.visit("http://localhost:3000")
        cy.get('.css-1lwbda4-MuiStack-root > .MuiFormControl-root > .MuiInput-root > #outlined-multiline-static').should(($div) => {
            expect($div.get(0).innerHTML).to.eq("//g")
        })

        cy.get('.css-1bi0bj-MuiStack-root > :nth-child(1)').click()
        cy.get('.css-1lwbda4-MuiStack-root > .MuiFormControl-root > .MuiInput-root > #outlined-multiline-static').should(($div) => {
            expect($div.get(0).innerHTML).to.eq("/([\\t\\n\\r]+)/g")
        })
        cy.get('[value="ipaddress"]').click()
    });

})
