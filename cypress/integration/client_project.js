// // client_project.js created with Cypress
// //
// // Start writing your Cypress tests below!
// // If you're unfamiliar with how Cypress works,
// // check out the link below and learn how to write your first test:
// // https://on.cypress.io/writing-first-test
// describe("client website",()=>{
// it('go to client website click button', () => {
//     cy.visit("https://happenings.events/booker-search-results",)
//     cy.get('.option-selector-container').click()
//     // cy.pause()
//     cy.get(':nth-child(6) > label').contains("<150")
//     cy.get('#txtDate').click()
//     cy.get('.ui-datepicker-days-cell-over > .ui-state-default').get(':nth-child(6) > label').click()
//     cy.get('#btnSearchVenues > span').click()
//     cy.get('#btnViewVenue_Cherry_Hill').click()

// });

// })
// Cypress.on('uncaught:exception', (err, runnable) => {
//     // we expect a 3rd party library error with message 'list not defined'
//     // and don't want to fail the test so we return false
//     if (err.message.includes('toggleAnchor is not defined')) {
//       return false
//     }
//     // we still want to ensure there are no other unexpected
//     // errors, so we let them fail the test
//   })