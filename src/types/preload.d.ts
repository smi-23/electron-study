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
    user: {
      login: (username: string, password: string) => Promise<any>
      logout: () => void,
      toLogin: () => void,
      signup: (username: string, password: string, passwordCheck: string) => Promise<any>
      toSignup: () => void
    }
    post: {
      createPost: (user_id: string, username: string, title: string, content: string) => Promise<any>
      getAllPost: () => Promise<any>
    }
  }
}
