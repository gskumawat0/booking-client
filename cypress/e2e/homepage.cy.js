describe('Homepage', () => {
  beforeEach(()=>{
    cy.visit('/');
  })

  it('homepage loads properly', () => {
    const today = new Date();
    const msInDay = 24 * 60 * 60 * 1000;
    today.setTime(today.valueOf() + msInDay);
    const month = `0${today.getMonth() + 1}`.slice(-2);
    const day = `0${today.getDate()}`.slice(-2);
    const nextDay = `${today.getFullYear()}-${month}-${day}`
    cy.get('[name="origin"]').type('Jaipur');
    cy.get('[name="destination"]').type('Kota');
    cy.get('[name="departDate"]').type(nextDay);
    cy.contains('button[type="submit"]', "Book Now").click();
    
    cy.location().should((loc)=>{
      expect(loc.pathname).to.eq('/aq-index')
    });
  });
});