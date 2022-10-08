describe('Cab Booking', () => {
  beforeEach(()=>{
    cy.visit('/');
  })

  it('insert journey details', () => {
    cy.visit('/');

    const today = new Date();
    const msInDay = 24 * 60 * 60 * 1000;
    today.setTime(today.valueOf() + msInDay);
    const month = `0${today.getMonth() + 1}`.slice(-2);
    const day = `0${today.getDate()}`.slice(-2);
    const nextDay = `${today.getFullYear()}-${month}-${day}`
    cy.get('[name="origin"]').type('Jaipur');
    cy.get('[name="destination"]').type('Kota');
    cy.get('[name="departDate"]').type(nextDay);
    
    cy.intercept("GET", 'https://taxi-booking-gs.herokuapp.com/bookings/drivers**', {
      fixture: "drivers.json",

    }).as('getDrivers');
    
    cy.contains('button[type="submit"]', "Book Now").click();
    // cy.contains("0 Drivers Found. Please try another search combination").should('be.visible');
    // test for loader

    cy.location().should((loc)=>{
      expect(loc.pathname).to.eq('/aq-index')
    });

    cy.wait('@getDrivers').its('response.body').should('have.property', 'drivers');
  })
})

// drivers page is showing journey details
// user can select the driver
// user can edit journey details
// user can change filters
// response must include request filters
// user should be redirected to payment page
// 