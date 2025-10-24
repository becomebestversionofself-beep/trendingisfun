import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App({ mode, onToggleMode }) {
  return (
    <BrowserRouter basename="/trendingisfun">
      <Routes>
        <Route path="/" element={<Home mode={mode} onToggleMode={onToggleMode} />} />
        <Route path="/list" element={<Home mode={mode} onToggleMode={onToggleMode} />} />
      </Routes>
    </BrowserRouter>
  );
}
