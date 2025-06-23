declare global {
  interface Window {
    configs: {
      apiUrl: string;
    };
  }
}

export const apiUrl = window?.configs?.apiUrl ? window.configs.apiUrl : "http://localhost:3000/api/reservations";

export const config = {
  serviceUrl: process.env.CHOREO_HOTEL_RESERVATION_CONNECTION_SERVICEURL || '',
  consumerKey: process.env.CHOREO_HOTEL_RESERVATION_CONNECTION_CONSUMERKEY || '',
  consumerSecret: process.env.CHOREO_HOTEL_RESERVATION_CONNECTION_CONSUMERSECRET || '',
  tokenUrl: process.env.CHOREO_HOTEL_RESERVATION_CONNECTION_TOKENURL || '',
  choreoApiKey: process.env.CHOREO_HOTEL_RESERVATION_CONNECTION_CHOREOAPIKEY || '',
};
