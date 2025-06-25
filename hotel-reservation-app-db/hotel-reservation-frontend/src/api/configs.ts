export const configs = {
  serviceUrl: window?.configs?.serviceUrl ? window.configs.serviceUrl : "http://serviceurl",
  consumerKey: window?.configs?.apiUrl ? window.configs.apiUrl : "http://apiUrl",
  consumerSecret: process.env.DB_HOST || '',
  tokenUrl: process.env.CHOREO_HOTEL_RESERVATION_CONNECTION_TOKENURL || '',
  choreoApiKey: process.env.CHOREO_HOTEL_RESERVATION_CONNECTION_CHOREOAPIKEY || 'chk_eyJjb25uZWN0aW9uLWlkIjoiMDFmMDRiN2QtYzQ5Yi0xNjk4LTk3MDgtM2NmN2JhZTA0OTgxIn0=n9cxIw',
};