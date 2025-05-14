export {};

declare global {
  interface OsInfo {
    platform: string;
  }
  interface VersionInfo {
    chrome: string;
    node: string;
  }
  interface Window {
    system: {
      getPlatform: () => Promise<OsInfo["platform"]>;
      getVersions: () => Promise<VersionInfo>;
    };
  }
}
