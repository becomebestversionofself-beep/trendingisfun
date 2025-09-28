import Home from "./components/Home"; 

export default function App({ mode, onToggleMode }) {
  return (
    <Home mode={mode} onToggleMode={onToggleMode}/>
  );
}
