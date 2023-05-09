import { AppConfig } from "./config.types";

export const appConfig: AppConfig = {
  appTitle: "MAKU",
  GraphQL: {
    name: "MAKU",
    url: "http://192.168.1.13/graphql"
  }
};

export const mountConfig = (): void => {
  const win: any = window;
  // 为了打包后的项目能够灵活修改该全局配置
  Object.assign(appConfig, win.appConfig);
  win.document.title = appConfig.appTitle;
};
