export const configs = {
  serviceUrl: window?.configs?.serviceurl ? window.configs.serviceurl : "http://servuceurl",
  consumerKey: process.env.CHOREO_HOTEL_RESERVATION_CONNECTION_CONSUMERKEY || 'IblRACLcYrGU6HAbh20ySpRT93d1',
  consumerSecret: process.env.CHOREO_HOTEL_RESERVATION_CONNECTION_CONSUMERSECRET || 'KGCVAnKSzEluG1Rpf98CGbDpwr2N',
  tokenUrl: process.env.CHOREO_HOTEL_RESERVATION_CONNECTION_TOKENURL || 'https://bfe41d90-923c-472f-b7d5-13d13da073ad-dev.e1-us-east-azure.choreosts.dev/oauth2/token',
  choreoApiKey: process.env.CHOREO_HOTEL_RESERVATION_CONNECTION_CHOREOAPIKEY || 'chk_eyJjb25uZWN0aW9uLWlkIjoiMDFmMDRiN2QtYzQ5Yi0xNjk4LTk3MDgtM2NmN2JhZTA0OTgxIn0=n9cxIw',
};