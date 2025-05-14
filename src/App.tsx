import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [platform, setPlatform] = useState<string | null>(null);

  useEffect(() => {
    window.api.getPlatform().then((platform) => {
      setPlatform(platform)
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
    </>
  );
}
