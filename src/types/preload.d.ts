export {};

declare global {
  interface OsInfo {
    platform: string;
  }
  interface Window {
      api: {
        getPlatform: () => Promise<OsInfo['platform']>
    };
  }
}
