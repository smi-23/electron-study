import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import MainPage from './pages/main';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}
