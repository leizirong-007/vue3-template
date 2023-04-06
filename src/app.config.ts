export interface AppConfig {
  axios: {
    baseURL: string;
    timeout: number;
    headers: {
      "Content-Type": string;
    };
  };
  appTitle: string;
}

export const appConfig: AppConfig = {
  axios: {
    baseURL: "http://192.168.1.13/v1",
    // baseURL: "http://10.15.15.137/v1",
    timeout: 6000,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  },
  appTitle: "MAKU"
};
