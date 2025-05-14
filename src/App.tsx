import { useEffect, useState } from "react";
import "./App.css";

interface VersionInfo {
  node: string;
  chrome: string;
}

export default function App() {
  const [platform, setPlatform] = useState<string | null>(null);
  const [versions, setVersions] = useState<VersionInfo | null>(null);

  useEffect(() => {
    window.system.getPlatform().then((platform) => {
      setPlatform(platform)
    });
    window.system.getVersions().then((versions) => {
      setVersions(versions);
    });
  }, []);

  return (
    <>
      <h1>Hello world!</h1>
      <span>안녕하세요 반가워요!</span>
      {platform && (
        <div>
          <h1>os information</h1>
          <p>{platform}</p>
        </div>
      )}
      {versions && (
        <div>
          <h1>version information</h1>
          <p>
            chrome: {versions.chrome}, node: { versions.node}
          </p>
        </div>
      )}
    </>
  );
}
