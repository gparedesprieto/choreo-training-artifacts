declare global {
  interface Window {
    configs: {
      apiUrl: string;
      serviceurl: string;
      consumerKey: string;
      consumerSecret: string;
      tokenUrl: string;
      choreoApiKey: string;
    };
  }
}

export const apiUrl = window?.configs?.apiUrl ? window.configs.apiUrl : "http://localhost:3000/api/reservations";
